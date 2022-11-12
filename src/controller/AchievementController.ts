import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IAchievementProperties from "../interfaceType/IAchievementProperties";
import AchievementRepository from "../repository/AchievementRepository";
import IAchievementRepository from "../repository/interface/IAchievementRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserAchievementRepository from "../repository/interface/IUserAchievementRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import UserAchievementRepository from "../repository/UserAchievementRepository";
import UserRepository from "../repository/UserRepository";
import AchievementService from "../service/AchievementService";
import Messages from "../utils/Messages";

export default class AchievementController {
    private achievementRepository: IAchievementRepository;
    private userAchievementRepository: IUserAchievementRepository;
    private userRepository: IUserRepository;
    private achievementService: AchievementService;
    private statisticsRepository: IStatisticsRepository;

    constructor(){
        this.achievementRepository = new AchievementRepository();
        this.userAchievementRepository = new UserAchievementRepository();
        this.userRepository = new UserRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.achievementService = new AchievementService(this.userRepository, this.achievementRepository, this.userAchievementRepository, this.statisticsRepository)
    }

    createAchievement = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const achievement: IAchievementProperties = request.body.achievement;

            const result = await this.achievementService.createAchievement(achievement);
            
            response.status(200).json({achievement: result});
        }catch(error: any){
            next(error);
        }
    }

    findAchievementByID = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const achievementID = Number(request.params.achievementID);

            if (isNaN(achievementID)){
                throw new HttpError(Messages.ACHIEVEMENT_ID_INCORRECT_TYPE, 403);
            }
            const result = await this.achievementService.findAchievementByID(achievementID);

            response.status(200).json({achievement: result});
        }catch(error: any){
            next(error);
        }
    }

    listAllAchievements = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.achievementService.listAllAchievements();
            
            response.status(200).json({ achievement: result });
        } catch(error: any) {
            next(error);
        }
    }

    associateUserToAchievement = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID);
            const technologyID = Number(request.body.technologyID); 

            if (isNaN(userID)){
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(technologyID)){
                throw new HttpError(Messages.TECHNOLOGY_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.achievementService.associateUserToAchievement(userID, technologyID);

            response.status(200).json({userAchievement: result});
        }catch(error: any){
            next(error);
        }
    }

    listAchievementUserHave = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID)

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.achievementService.listAchievementUserHave(userID);
    
            response.status(200).json({ achievements: result });
        }catch(error: any) {
            next(error)
        }
    }
}