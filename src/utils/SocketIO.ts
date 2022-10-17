import { Server } from "socket.io";
import http from 'http';
import CodeAndDataGenerator from './CodeAndDateGenerator';
import ExerciseRepository from "../repository/ExerciseRepository";
import IServerToClientEventsProperties from "../interfaceType/socket/IServerToClientEventsProperties";
import ChallengeRepository from "../repository/ChallengeRepository";

export default class SocketIO {
    private io: Server<
        IClientToServerEventsProperties,
        IServerToClientEventsProperties,
        IInterServerEventsProperties,
        ISocketDataProperties
    >;
    private codeAndDataGenerator = new CodeAndDataGenerator();
    private exerciseRepository = new ExerciseRepository();
    private challengeRepository = new ChallengeRepository();

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
            socket.on('play', (userID: number) => {
                let roomNumber =  this.codeAndDataGenerator.codeGenerator(1, 9999);
                socket.data.userID = userID;

                socket.join(roomNumber);
                socket.emit('roomNumber', roomNumber);
            });

            socket.on('acceptChallenge', (roomNumber: string, userID: number) => {
                if(!this.io.sockets.adapter.rooms.get(roomNumber)) {
                    socket.emit('roomNotExists');
                } else {
                    socket.data.userID = userID;
                    socket.join(roomNumber);
                    this.io.in(roomNumber).emit('initChallenge', roomNumber);
                }
            });

            socket.on('randomizeExercises', async (roomNumber: string) => {
                const usersInRoom = await this.io.in(roomNumber).fetchSockets();
                let usersID: number[] = usersInRoom.map((socket) => socket.data.userID);

                const randomExercisesIDs: number[] = await this.exerciseRepository.randomizeExercisesIDs();
                const randomExercises = await this.challengeRepository.findChallengesByExercisesIds(randomExercisesIDs);

                this.io.in(roomNumber).emit('randomizedExercises', randomExercises, usersID);
            });

            socket.on('answered', async (roomNumber: string, isCorrect: boolean) => {
                socket.to(roomNumber).emit('opponentAnswer', isCorrect);
            });

            socket.on('nextQuestion', (roomNumber: string) => {
                this.io.in(roomNumber).emit('goToNextQuestion');
            });

            socket.on('allUsersFinished', (roomNumber: string) => {
                this.io.in(roomNumber).emit('challengeFinished')
            });

            socket.on('exitRoom', (roomNumber: string) => {
                socket.leave(roomNumber);
            });

            socket.on('rematch', (roomNumber: string) => {
                socket.to(roomNumber).emit('opponentWantsRematch');
            });

            socket.on('acceptRematch', (roomNumber: string) => {
                socket.to(roomNumber).emit('rematchAccepted');
            });
            
            socket.on('disconnect', () => {
                console.log('desconectado');
            });
        })
    }
}