import { IsNull } from "typeorm";
import HttpError from "../exceptions/HttpError";
import IStatisticsProperties from "../interfaceType/IStatisticsProperties";
import StatisticsModel from "../model/StatisticsModel";
import UserModel from "../model/UserModel";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import Constants from "../utils/Constants";

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
        const statistics = await this.statisticsRepository.findStatisticsByUser(userID);
        const quantityCurrentXp = await this.statisticsRepository.getCurrentXp(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        if(!statistics) {
            throw new HttpError('Statistics not found!', 404);
        }

        const sumXp = quantityCurrentXp + xpGained;
        const rest = sumXp - Constants.MAX_TOTAL_XP;
        statistics.dayXp += xpGained;
        statistics.mounthXp += xpGained;
        statistics.totalXp += xpGained;
        statistics.currentXp += xpGained;

        if(statistics.currentXp >= Constants.MAX_TOTAL_XP){
            statistics.currentXp = rest;
        }

        return sumXp;
    }

    getMounthXpByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.statisticsRepository.getMounthXpByUser(userID);

        return result;
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

        return result;
    }
}


