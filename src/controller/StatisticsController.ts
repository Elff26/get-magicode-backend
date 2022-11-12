import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import GoalRepository from "../repository/GoalRepository";
import IGoalRepository from "../repository/interface/IGoalRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LevelRepository from "../repository/LevelRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import UserRepository from "../repository/UserRepository";
import StatisticsService from "../service/StatisticsService";
import Messages from "../utils/Messages";

export default class StatisticsController {
    private statisticsService: StatisticsService;
    private statisticsRepository: IStatisticsRepository;
    private userRepository: IUserRepository;
    private levelRepository: ILevelRepository;
    private goalRepository: IGoalRepository;

    constructor() {
        this.statisticsRepository = new StatisticsRepository();
        this.userRepository = new UserRepository();
        this.levelRepository = new LevelRepository();
        this.goalRepository = new GoalRepository();

        this.statisticsService = new StatisticsService(this.statisticsRepository, this.userRepository, this.levelRepository, this.goalRepository);
    }

    createUserStatistics = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.createUserStatistics(userID)

            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

    addExperienceToUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);
            const xpGain = Number(request.body.xpGain);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            if(isNaN(xpGain)) {
                throw new HttpError(Messages.EXPERIENCE_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.addExperienceToUser(userID, xpGain)
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

                                                  
    getMonthXpByUser = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.getMonthXpByUser(userID);
            
            response.status(200).json({ monthXp: result });
        }catch(error: any){
            next(error);
        }
    }

    getHigherXP = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const type = request.params.type

            const result = await this.statisticsService.getHigherXP(type);
            response.status(200).json({ higherXp: result });
        }catch(error: any){
            next(error);
        }
    }

    findStatisticsByUser = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.findStatisticsByUser(userID);
            
            response.status(200).json({ statistics: result });
        }catch(error: any){
            next(error);
        }
    } 

    counter = async (request: Request, response: Response, next: NextFunction) => {
        try{            
            const userID = Number(request.params.userID);
            const type = request.body.type;
            const numberOfHits = request.body.numberOfHits;
            const numberOfClasses = request.body.numberOfClasses;
            const numberOfMistakes = request.body.numberOfMistakes;

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.counter(userID, type, numberOfHits, numberOfClasses, numberOfMistakes);

            response.status(200).json({ response: result });
        }catch(error: any){
            next(error);
        }
    }

    getClassroomCompletedByUser = async (request: Request, response: Response, next: NextFunction) => {
        try{            
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.getClassroomCompletedByUser(userID);

            response.status(200).json({ classroomCompleted: result });
        }catch(error: any){
            next(error);
        }
    }

    completedGoal = async (request: Request, response: Response, next: NextFunction) => {
        try{            
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.statisticsService.completedGoal(userID);

            response.status(200).json({ response: result });
        }catch(error: any){
            next(error);
        }
    }
}