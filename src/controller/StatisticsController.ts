import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IStatisticsProperties from "../interfaceType/IStatisticsProperties";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import UserRepository from "../repository/UserRepository";
import StatisticsService from "../service/StatisticsService";

export default class StatisticsController {
    private statisticsService: StatisticsService;
    private statisticsRepository: IStatisticsRepository;
    private userRepository: IUserRepository;

    constructor() {
        this.statisticsRepository = new StatisticsRepository;
        this.userRepository = new UserRepository;
        this.statisticsService = new StatisticsService(this.statisticsRepository, this.userRepository);
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
}