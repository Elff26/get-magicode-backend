import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LevelRepository from "../repository/LevelRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import UserRepository from "../repository/UserRepository";
import FacebookService from "../service/FacebookService";

export default class FacebookController {
    private userRepository: IUserRepository;
    private facebookService: FacebookService;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.levelRepository = new LevelRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.facebookService = new FacebookService(this.userRepository, this.statisticsRepository, this.levelRepository);
    }

    siginWithFacebook = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const facebookCode: string = request.body.facebookCode;

            if(!facebookCode) {
                throw new HttpError("Error when trying to connect to facebook!", 400);
            }

            const result = await this.facebookService.siginWithFacebook(facebookCode);
    
            response.status(201).send({ userInfo: result });
        } catch(error: any) {
            next(error)
        }
    }

    checkFacebookToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const facebookToken: string | string[] | undefined = request.headers.externalaccesstoken;
            const userID: number = Number(request.headers.userid);

            if(!facebookToken || typeof(facebookToken) !== "string") {
                throw new HttpError("Token is required!", 400);
            }

            if(isNaN(userID)) {
                throw new HttpError("ID must be a number!", 400);
            }
    
            const result = await this.facebookService.checkFacebookToken(facebookToken, userID);
    
            response.status(200).send({ userInfo: result });
        } catch(error: any) {
            next(error)
        }
    }
}
