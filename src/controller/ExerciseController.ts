import ExerciseRepository from "../repository/ExerciseRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import ExerciseService from "../service/ExerciseService";
import { NextFunction, Request, Response } from "express";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import HttpError from "../exceptions/HttpError";
import IUserRepository from "../repository/interface/IUserRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ChallengeRepository from "../repository/ChallengeRepository";
import UserRepository from "../repository/UserRepository";

export default class ExerciseController{
    private exerciseRepository: IExerciseRepository;
    private challangeRepository: IChallengeRepository;
    private userRepository: IUserRepository;
    private exerciseService: ExerciseService;

    constructor(){
        this.exerciseRepository = new ExerciseRepository();
        this.challangeRepository = new ChallengeRepository();
        this.userRepository = new UserRepository();
        this.exerciseService = new ExerciseService(this.exerciseRepository, this.userRepository, this.challangeRepository);
    }

    createExercise = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const exercise: IExerciseProperties = request.body.exercise;
            const result = await this.exerciseService.createExercise(exercise);
            
            response.status(200).json({exercise: result});
        }catch(error: any){
            next(error);
        }
    }

    findExerciseById = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const exerciseID = Number(request.params.exerciseID);

            if(isNaN(exerciseID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.exerciseService.findExerciseById(Number(request.params.exerciseID));
    
            response.status(200).json({ exercise: result });
        }  catch(error: any) {
            next(error)
        }
    }

    sendExerciseCode = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);
            const exerciseID = Number(request.params.exerciseID);
            const userCode = request.body.userCode;
            const language = request.body.language;

            if(isNaN(userID)) {
                throw new HttpError('User ID must be a number', 403);
            }

            if(isNaN(exerciseID)) {
                throw new HttpError('Exercise ID must be a number', 403);
            }

            if(!userCode) {
                throw new HttpError('Code is required', 403);
            }

            if(!language) {
                throw new HttpError('Language is required', 403);
            }

            const result = await this.exerciseService.sendExerciseCode(userID, exerciseID, userCode, language);

            response.status(200).json({ result: result });
        } catch(error: any) {
            next(error)
        }
    }

    findExercisesByIds = async (request: Request, response: Response, next: NextFunction) => {
        try {   
            const exercises = request.body.exercises;

            if(exercises.length <= 0) {
                throw new HttpError('IDs are required', 403);
            }

            const result = await this.exerciseService.findExercisesByIds(exercises);
    
            response.status(200).json({ exercise: result });
        }  catch(error: any) {
            next(error)
        }
    }

    randomizeExercisesIDs = async (request: Request, response: Response, next: NextFunction) => {
        try {   
            let technologyID = Number(request.params.userID);

            if(isNaN(technologyID)) {
                throw new HttpError('Technology ID must be a number', 403);
            }

            const result = await this.exerciseService.randomizeExercisesIDs(technologyID);
    
            response.status(200).json(result);
        }  catch(error: any) {
            next(error)
        }
    }
}