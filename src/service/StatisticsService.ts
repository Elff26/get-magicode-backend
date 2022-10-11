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
        const level = await this.levelRepository.findFirstLevel();

        if(level) {
            statistics.level = level;
        }

        userExists.statistics = statistics;
        statistics.user = userExists;

        const result = this.userRepository.save(userExists);

        return result;
    }

    addExperienceToUser = async (userID: number, xpGained: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);
        
        if(!statisticsExists) {
            const statistics = this.createUserStatistics(userID);
            
            const level = await this.levelRepository.findFirstLevel();

            if(!level) {
                throw new HttpError('There is no level!', 404);
            }

            statisticsExists = new StatisticsModel();
            statisticsExists.level = level;
            statisticsExists.currentXp = 0;
            statisticsExists.totalXp = 0;
            statisticsExists.dayXp = 0;
            statisticsExists.monthXp = 0;
        }

        statisticsExists.addExperienceToUser(xpGained);

        const savedStatistics = await this.statisticsRepository.saveOrUpdate(statisticsExists);
        userExists.statistics = savedStatistics;

        const result = await this.userRepository.save(userExists);

        return result;
    }

    getMonthXpByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.statisticsRepository.getMonthXpByUser(userID);

        return result?.monthXp;
    }

    getHigherXP = async (type: string) => {
        return await this.statisticsRepository.getHigherXP(type);
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

    completedGoal = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const goalUser = await this.userRepository.getGoalByUser(userID);
        const statisticsExists = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!statisticsExists) {
            throw new HttpError('Estatistics not found!', 404);
        }

        //TODO: PROCEDURE PARA SETAR FLAG COMO FALSE TODO FIM DE DIA
        if(!statisticsExists.completedGoal && statisticsExists.dayXp >= goalUser.g_vl_meta){
            this.addExperienceToUser(userID, 10);
            statisticsExists.completedGoal = true;

            return await this.statisticsRepository.saveOrUpdate(statisticsExists);
        }
    }
}


