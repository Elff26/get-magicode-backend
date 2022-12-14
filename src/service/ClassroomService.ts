import HttpError from "../exceptions/HttpError";
import IClassroomProperties from "../interfaceType/IClassroomProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IClassroomRepository from "../repository/interface/IClassroomRepository";
import Messages from "../utils/Messages";

export default class ClassroomService{
    private classroomRepository: IClassroomRepository;
    private challengeRepository: IChallengeRepository;

    constructor(classroomRepository:IClassroomRepository, challengeRepository: IChallengeRepository){
        this.classroomRepository = classroomRepository;
        this.challengeRepository = challengeRepository;
    }

    createClassroom = async (classroom: IClassroomProperties) =>{
        return await this.classroomRepository.save(classroom);
    }

    findClassroomById = async (classroomID: number) => {
        return await this.classroomRepository.findClassroomById(classroomID);
    }

    countAllClassrooms = async () => {
        return await this.classroomRepository.countAllClassrooms();
    }

    findClassroomByChallenge = async (challengeID: number) => {
        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError(Messages.CHALLENGE_NOT_FOUND, 404);
        }

        const classrooms = await this.classroomRepository.findClassroomByChallenge(challengeExists.challengeID);

        if(!classrooms || classrooms.length === 0) {
            throw new HttpError(Messages.CHALLENGE_HAS_NO_CLASSROOMS, 404);
        }

        return classrooms;
    }
}