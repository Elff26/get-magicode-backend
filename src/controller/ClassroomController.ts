import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IClassroomProperties from "../interfaceType/IClassroomProperties";
import ChallengeRepository from "../repository/ChallengeRepository";
import ClassroomRepository from "../repository/ClassroomRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IClassroomRepository from "../repository/interface/IClassroomRepository";
import ClassroomService from "../service/ClassroomService";

export default class ClassroomController{
    private classroomRepository: IClassroomRepository;
    private challengeRepository: IChallengeRepository;
    private classroomService: ClassroomService;

    constructor(){
        this.classroomRepository = new ClassroomRepository();
        this.challengeRepository = new ChallengeRepository();
        this.classroomService = new ClassroomService( this.classroomRepository, this.challengeRepository);
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

            if(isNaN(classroomID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.classroomService.findClassroomById(classroomID);
    
            response.status(200).json({ classroom: result });
        }  catch(error: any) {
            next(error)
        }
    }

    findClassroomByChallenge = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const challengeID = Number(request.params.challengeID);

            if(isNaN(challengeID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.classroomService.findClassroomByChallenge(challengeID);
    
            response.status(200).json({ classrooms: result });
        } catch (error: any) {
            next(error)
        }
    }

    countAllClassrooms = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.classroomService.countAllClassrooms();
    
            response.status(200).json({ numberOfClasses: result });
        } catch (error: any) {
            next(error)
        }
    }
}