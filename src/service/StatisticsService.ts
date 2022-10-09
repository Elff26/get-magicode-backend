import HttpError from "../exceptions/HttpError";
import StatisticsModel from "../model/StatisticsModel";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class StatisticsService {
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;

    constructor(statisticsRepository: IStatisticsRepository, userRepository: IUserRepository, levelRepository: ILevelRepository){
        this.statisticsRepository = statisticsRepository;
        this.levelRepository = levelRepository;
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

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);

        if(!statisticsExists) {
            const level = await this.levelRepository.findFirstLevel();

            if(!level) {
                throw new HttpError('There is no level!', 404);
            }

            statisticsExists = new StatisticsModel();
            statisticsExists.user = userExists;
            statisticsExists.level = level;
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