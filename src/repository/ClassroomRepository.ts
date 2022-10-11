import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Classroom } from "../database/model/Classroom";
import IClassroomRepository from "./interface/IClassroomRepository";

export default class ClassroomRepository implements IClassroomRepository{
    private classroomRepository: Repository<Classroom>
    constructor(){
        this.classroomRepository = AppDataSource.manager.getRepository(Classroom);
    }

    save = async (classroom: Classroom) => {
        classroom.description = JSON.stringify(classroom.description);

        return await this.classroomRepository.save(classroom);
    }

    //TODO: Testar em ambiente de PROD
    getClassroomJSON = async(classroomID: number)=>{
        return await this.classroomRepository.createQueryBuilder('Classroom')
                                             .where(`Classroom.description ::jsonb @> \'{"classroom":{"classroomID":"${classroomID}"}}\'`)
                                             .getMany();
    }

    findClassroomById = async (classroomID: number) => {
        return await this.classroomRepository.findOneBy({
            classroomID: classroomID
        })
    }

    findClassroomByChallenge = async (challengeID: number) => {
        return await this.classroomRepository.createQueryBuilder('classroom')  
                                                .leftJoinAndSelect('classroom.challenge', 'challenge')
                                                .where('classroom.cd_desafio = :challengeID', { challengeID })
                                                .getMany();
    }

    countAllClassrooms = async () => {
        return await this.classroomRepository.count();
    }
}