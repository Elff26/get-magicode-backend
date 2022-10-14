import ExerciseRepository from "../repository/ExerciseRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import ExerciseService from "../service/ExerciseService";
import { NextFunction, Request, Response } from "express";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import HttpError from "../exceptions/HttpError";
import StatisticsRepository from "../repository/StatisticsRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ChallengeRepository from "../repository/ChallengeRepository";
import UserRepository from "../repository/UserRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import LevelRepository from "../repository/LevelRepository";

export default class ExerciseController{
    private exerciseRepository: IExerciseRepository;
    private statisticsRepository: IStatisticsRepository;
    private challangeRepository: IChallengeRepository;
    private userRepository: IUserRepository;
    private levelRepository: ILevelRepository;
    private exerciseService: ExerciseService;

    constructor(){
        this.exerciseRepository = new ExerciseRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.challangeRepository = new ChallengeRepository();
        this.levelRepository = new LevelRepository();
        this.userRepository = new UserRepository();
        this.exerciseService = new ExerciseService(this.exerciseRepository, this.statisticsRepository, this.userRepository, this.levelRepository, this.challangeRepository);
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
            const challengeID = Number(request.params.challengeID);
            const exerciseID = Number(request.params.exerciseID);
            const userCode = request.body.userCode;
            const language = request.body.language;

            if(isNaN(userID)) {
                throw new HttpError('User ID must be a number', 403);
            }

            if(isNaN(challengeID)) {
                throw new HttpError('Challenge ID must be a number', 403);
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

            const result = await this.exerciseService.sendExerciseCode(userID, challengeID, exerciseID, userCode, language);

            response.status(200).json({ result: result });
        } catch(error: any) {
            next(error)
        }
    }

    sendExerciseCodeTwo = async (request: Request, response: Response, next: NextFunction) => {
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

            const result = await this.exerciseService.sendExerciseCodeTwo(userID, exerciseID, userCode, language);

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
            const result = await this.exerciseService.randomizeExercisesIDs();
    
            response.status(200).json(result);
        }  catch(error: any) {
            next(error)
        }
    }
}