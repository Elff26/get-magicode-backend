import { IsNull } from "typeorm";
import HttpError from "../exceptions/HttpError";
import IStatisticsProperties from "../interfaceType/IStatisticsProperties";
import StatisticsModel from "../model/StatisticsModel";
import UserModel from "../model/UserModel";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class StatisticsService {
    private statisticsRepository: IStatisticsRepository;
    private userRepository: IUserRepository;

    constructor(statisticsRepository: IStatisticsRepository, userRepository: IUserRepository){
        this.statisticsRepository = statisticsRepository;
        this.userRepository = userRepository;
    }

    createUserStatistics = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const statistics = new StatisticsModel();

        statistics.user = userExists;

        const result = this.statisticsRepository.saveOrUpdate(statistics);

        return result;
    }

    addExperienceToUser = async (userID: number, xpGain: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);

        if(!statisticsExists) {
            statisticsExists = new StatisticsModel();
            statisticsExists.user = userExists;
            statisticsExists.currentXp = 0;
            statisticsExists.totalXp = 0;
            statisticsExists.dayXp = 0;
            statisticsExists.mounthXp = 0;
        }

        statisticsExists.addExperienceToUser(xpGain);

        const result = await this.statisticsRepository.saveOrUpdate(statisticsExists);

        return result;
    }
}