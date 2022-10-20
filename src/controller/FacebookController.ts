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
    
            response.status(201).send(result);
        } catch(error: any) {
            next(error)
        }
    }

    checkFacebookToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const facebookToken: string | string[] | undefined = request.headers.accesstoken;

            if(!facebookToken || typeof(facebookToken) !== "string") {
                throw new HttpError("Token is required!", 400);
            }
    
            const result = await this.facebookService.checkFacebookToken(facebookToken);
    
            response.status(200).send(result);
        } catch(error: any) {
            next(error)
        }
    }
}
