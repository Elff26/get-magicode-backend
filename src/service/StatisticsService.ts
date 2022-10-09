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

    addExperienceToUser = async (userID: number, xpGained: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
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

        statisticsExists.addExperienceToUser(xpGained);

        const result = await this.statisticsRepository.saveOrUpdate(statisticsExists);

        return result;
    }

    getMounthXpByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.statisticsRepository.getMounthXpByUser(userID);

        return result?.mounthXp;
    }

    getHigherXP = async () => {
        return await this.statisticsRepository.getHigherXP();
    }

    counter = async (userID: number, type:string) => {
        const userExists = await this.userRepository.findUserById(userID);
        const statistics = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        if(!statistics) {
            throw new HttpError('Statistics not found!', 404);
        }

        if(type === 'hits'){
            statistics.numberOfHits += 1;
            return await this.statisticsRepository.saveOrUpdate(statistics);
        }

        if(type === 'classroom'){
            statistics.completedClasses += 1;
            return await this.statisticsRepository.saveOrUpdate(statistics);
        }

        statistics.numberOfMistakes += 1;
        return await this.statisticsRepository.saveOrUpdate(statistics);
    }

    getClassroomCompletedByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.statisticsRepository.getClassroomCompletedByUser(userID);

        return result.Statistics_nr_aulas_completas;
    }
}


