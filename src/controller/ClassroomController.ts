import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IClassroomProperties from "../interfaceType/IClassroomProperties";
import ClassroomRepository from "../repository/ClassroomRepository";
import IClassroomRepository from "../repository/interface/IClassroomRepository";
import ClassroomService from "../service/ClassroomService";

export default class ClassroomController{
    private classroomRepository: IClassroomRepository
    private classroomService: ClassroomService

    constructor(){
        this.classroomRepository = new ClassroomRepository();
        this.classroomService = new ClassroomService( this.classroomRepository);
    }

    createClassroom = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const classroom: IClassroomProperties = request.body.classroom;
            const result = await this.classroomService.createClassroom(classroom);
            
            response.status(200).json({classroom: result});
        }catch(error: any){
            next(error);
        }
    }

    findClassroomById = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const classroomID = Number(request.params.classroomID);
            console.log(classroomID, "control")

            if(isNaN(classroomID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.classroomRepository.findClassroomById(Number(request.params.classroomID));
    
            response.status(200).json({ classroom: result });
        }  catch(error: any) {
            next(error)
        }
    }
}