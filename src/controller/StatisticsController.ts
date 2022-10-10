import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LevelRepository from "../repository/LevelRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import UserRepository from "../repository/UserRepository";
import StatisticsService from "../service/StatisticsService";

export default class StatisticsController {
    private statisticsService: StatisticsService;
    private statisticsRepository: IStatisticsRepository;
    private userRepository: IUserRepository;
    private levelRepository: ILevelRepository;

    constructor() {
        this.statisticsRepository = new StatisticsRepository;
        this.userRepository = new UserRepository;
        this.levelRepository = new LevelRepository;

        this.statisticsService = new StatisticsService(this.statisticsRepository, this.userRepository, this.levelRepository);
    }

    addExperienceToUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);
            const xpGain = Number(request.body.xpGain);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            if(isNaN(xpGain)) {
                throw new HttpError('XP must be a number', 403);
            }

            const result = await this.statisticsService.addExperienceToUser(userID, xpGain)
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

                                                  
    getMounthXpByUser = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.statisticsService.getMounthXpByUser(userID);
            
            response.status(200).json({ mounthXp: result });
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

    counter = async (request: Request, response: Response, next: NextFunction) => {
        try{            
            const userID = Number(request.params.userID);
            const type = request.body.type;

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.statisticsService.counter(userID, type);

            response.status(200).json({ response: result });
        }catch(error: any){
            next(error);
        }
    }

    getClassroomCompletedByUser = async (request: Request, response: Response, next: NextFunction) => {
        try{            
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.statisticsService.getClassroomCompletedByUser(userID);

            response.status(200).json({ classroomCompleted: result });
        }catch(error: any){
            next(error);
        }
    }
}