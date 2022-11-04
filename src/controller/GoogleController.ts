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
import GoogleService from "../service/GoogleService";

export default class GoogleController {
    private userRepository: IUserRepository;
    private googleService: GoogleService;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private goalRepository: IGoalRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.levelRepository = new LevelRepository();
        this.goalRepository = new GoalRepository();
        this.googleService = new GoogleService(this.userRepository, this.statisticsRepository, this.levelRepository, this.goalRepository);
    }

    siginWithGoogle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const googleCode: string = request.body.googleCode;

            if(!googleCode) {
                throw new HttpError("Error when trying to connect to google!", 400);
            }
    
            const result = await this.googleService.siginWithGoogle(googleCode);
    
            response.status(201).send({ userInfo: result });
        } catch(error: any) {
            next(error)
        }
    }

    checkGoogleToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const googleToken: string | string[] | undefined = request.headers.externalaccesstoken;
            const userID: number = Number(request.headers.userid);

            if(!googleToken || typeof(googleToken) !== "string") {
                throw new HttpError("Token is required!", 400);
            }

            if(isNaN(userID)) {
                throw new HttpError("ID must be a number!", 400);
            }
    
            const result = await this.googleService.checkGoogleToken(googleToken, userID);

            response.status(200).send({ userInfo: result });
        } catch(error: any) {
            next(error)
        }
    }
}
