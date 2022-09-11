import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Classroom } from "../database/entity/Classroom";
import ClassroomModel from "../model/ClassroomModel";
import IClassroomRepository from "./interface/IClassroomRepository";

export default class ClassroomRepository implements IClassroomRepository{
    private classroomRepository: Repository<Classroom>
    constructor(){
        this.classroomRepository = AppDataSource.manager.getRepository(Classroom);
    }

    save = async (classroom: ClassroomModel) => {
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
}