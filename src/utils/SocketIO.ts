import { Server } from "socket.io";
import http from 'http';
import CodeAndDataGenerator from './CodeAndDateGenerator';
import ExerciseRepository from "../repository/ExerciseRepository";
import IServerToClientEventsProperties from "../interfaceType/socket/IServerToClientEventsProperties";
import ChallengeRepository from "../repository/ChallengeRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import TechnologyRepository from "../repository/TechnologieRepository";

export default class SocketIO {
    private io: Server<
        IClientToServerEventsProperties,
        IServerToClientEventsProperties,
        IInterServerEventsProperties,
        ISocketDataProperties
    >;
    private codeAndDataGenerator = new CodeAndDataGenerator();
    private exerciseRepository: IExerciseRepository = new ExerciseRepository();
    private challengeRepository: IChallengeRepository = new ChallengeRepository();
    private tecnologyRepository: ITechnologyRepository = new TechnologyRepository();

    constructor(server: http.Server) {
        this.io = new Server<
            IClientToServerEventsProperties,
            IServerToClientEventsProperties,
            IInterServerEventsProperties,
            ISocketDataProperties
            >(server, {
            cors: {
                origin: '*'
            }
        });
    }

    socketEvents() {
        this.io.on('connection', async (socket) => {
            socket.on('play', (userID: number, technologyID: number) => {
                let roomNumber =  this.codeAndDataGenerator.codeGenerator(1, 9999);
                socket.data.userID = userID;
                socket.data.technologyID = technologyID;
                socket.data.nextQuestion = false;

                socket.join(roomNumber);
                socket.emit('roomNumber', roomNumber);
            });

            socket.on('acceptChallenge', (roomNumber: string, userID: number, technologyID: number) => {
                if(!this.io.sockets.adapter.rooms.get(roomNumber)) {
                    socket.emit('roomNotExists');
                } else {
                    socket.data.userID = userID;
                    socket.data.technologyID = technologyID;
                    socket.data.nextQuestion = false;
                    socket.join(roomNumber);
                    this.io.in(roomNumber).emit('initChallenge', roomNumber);
                }
            });

            socket.on('randomizeExercises', async (roomNumber: string) => {
                const usersInRoom = await this.io.in(roomNumber).fetchSockets();
                let usersID: number[] = usersInRoom.map((socket) => socket.data.userID);
                let technologyID: number = usersInRoom.map((socket) => socket.data.technologyID)[0];

                const technology = await this.tecnologyRepository.findByID(technologyID);
                const randomExercisesIDs: number[] = await this.exerciseRepository.randomizeExercisesIDs(technologyID);
                const randomExercises = await this.challengeRepository.findChallengesByExercisesIds(randomExercisesIDs);

                this.io.in(roomNumber).emit('randomizedExercises', randomExercises, usersID, technology);
            });

            socket.on('answered', async (roomNumber: string, isCorrect: boolean) => {
                socket.data.nextQuestion = true;
                socket.to(roomNumber).emit('opponentAnswer', isCorrect);
            });

            socket.on('nextQuestion', async (roomNumber: string) => {
                const usersInRoom = await this.io.in(roomNumber).fetchSockets();
                let nextQuestion: boolean[] = usersInRoom.map((socket) => socket.data.nextQuestion);
                
                if(nextQuestion[0] && nextQuestion[1]) {
                    socket.data.nextQuestion = false;
                    this.io.in(roomNumber).emit('goToNextQuestion');
                    this.io.in(roomNumber).emit('resetNextQuestion');
                }
            });

            socket.on('resetUserNextQuestion', () => {
                socket.data.nextQuestion = false;
            });

            socket.on('allUsersFinished', (roomNumber: string) => {
                this.io.in(roomNumber).emit('challengeFinished')
            });

            socket.on('exitRoom', (roomNumber: string) => {
                socket.leave(roomNumber);
            });

            socket.on('leaveRoom', (roomNumber: string) => {
                console.log(roomNumber)
                socket.to(roomNumber).emit('opponentLeaveRoom')
            });
            
            socket.on('disconnect', () => {
                console.log('desconectado');
            });
        })
    }
}