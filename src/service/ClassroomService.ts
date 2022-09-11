import IClassroomProperties from "../interfaceType/IClassroomProperties";
import IClassroomRepository from "../repository/interface/IClassroomRepository";

export default class ClassroomService{
    private classroomRepository: IClassroomRepository;

    constructor(classroomRepository:IClassroomRepository){
        this.classroomRepository = classroomRepository;
    }

    createClassroom = async (classroom: IClassroomProperties) =>{
        return await this.classroomRepository.save(classroom);
    }
}