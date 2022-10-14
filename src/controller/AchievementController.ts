import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IAchievementProperties from "../interfaceType/IAchievementProperties";
import AchievementRepository from "../repository/AchievementRepository";
import IAchievementRepository from "../repository/interface/IAchievementRepository";
import IUserAchievementRepository from "../repository/interface/IUserAchievementRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import UserAchievementRepository from "../repository/UserAchievementRepository";
import UserRepository from "../repository/UserRepository";
import AchievementService from "../service/AchievementService";

export default class AchievementController {
    private achievementRepository: IAchievementRepository;
    private userAchievementRepository: IUserAchievementRepository;
    private userRepository: IUserRepository;
    private achievementService: AchievementService;

    constructor(){
        this.achievementRepository = new AchievementRepository();
        this.userAchievementRepository = new UserAchievementRepository();
        this.userRepository = new UserRepository();
        this.achievementService = new AchievementService(this.userRepository, this.achievementRepository, this.userAchievementRepository)
    }

    createAchievement = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const achievement: IAchievementProperties = request.body.achievement;


            console.log(achievement)
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
                throw new HttpError('ID must be a number !', 403);
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
            const achievementID = Number(request.params.achievementID);
            const userID = Number(request.params.userID);

            if (isNaN(achievementID)){
                throw new HttpError('Challenge ID must be a number !', 403);
            }

            if (isNaN(userID)){
                throw new HttpError('User ID must be a number !', 403);
            }

            const result = await this.achievementService.associateUserToAchievement(achievementID, userID);

            response.status(200).json({userAchievement: result});
        }catch(error: any){
            next(error);
        }
    }
}