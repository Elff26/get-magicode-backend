import { Statistics } from "../database/model/Statistics";
import HttpError from "../exceptions/HttpError";
import ICompletedGoalProperties from "../interfaceType/ICompletedGoalProperties";
import IGoalRepository from "../repository/interface/IGoalRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import DateUtils from "../utils/DateUtils";
import Messages from "../utils/Messages";

export default class StatisticsService {
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;
    private goalRepository: IGoalRepository;

    constructor(statisticsRepository: IStatisticsRepository, userRepository: IUserRepository, levelRepository: ILevelRepository, goalRepository: IGoalRepository){
        this.statisticsRepository = statisticsRepository;
        this.levelRepository = levelRepository;
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
    }

    createUserStatistics = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const statistics = new Statistics();
        const level = await this.levelRepository.findFirstLevel();

        if(!level) {
            throw new HttpError(Messages.LEVEL_NOT_FOUND, 404);
        }
        
        statistics.level = level;

        const newStatistics = await this.statisticsRepository.saveOrUpdate(statistics);

        userExists.statistics = newStatistics;

        const result = this.userRepository.save(userExists);

        return result;
    }

    findStatisticsByUser = async(userID: number)=>{
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const result = await this.statisticsRepository.findStatisticsByUser(userExists.userID);
        
        return result;
    }

    addExperienceToUser = async (userID: number, xpGained: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);
        
        if(!statisticsExists) {
            const level = await this.levelRepository.findFirstLevel();

            if(!level) {
                throw new HttpError(Messages.LEVEL_NOT_FOUND, 404);
            }

            statisticsExists.initStatistics(level);
        }

        let oldCurrentXp = statisticsExists.currentXp + xpGained;

        statisticsExists.addExperienceToUser(xpGained, statisticsExists.level);

        const levelUp = await this.levelRepository.findLevelForUser(oldCurrentXp, statisticsExists.level.levelNumber);
        
        if(levelUp) {
            statisticsExists.level = levelUp;
        } 


        const savedStatistics = await this.statisticsRepository.saveOrUpdate(statisticsExists);

        userExists.statistics = savedStatistics;

        const result = await this.userRepository.save(userExists);

        return result;
    }

    getMonthXpByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const result = await this.statisticsRepository.getMonthXpByUser(userID);

        return result?.monthXp;
    }

    getHigherXP = async (type: string) => {
        let usersHigherXp = await this.statisticsRepository.getHigherXP(type);

        let usersHigherXpWithImage = usersHigherXp.map((statistics) => {
            if(statistics.user.image) {
                statistics.user.image = Buffer.from(statistics.user.image).toString('base64');
            }

            return statistics;
        });

        return usersHigherXpWithImage;
    }

    counter = async (userID: number, type:string, numberOfHits: number, numberOfClasses: number, numberOfMistakes: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        const statistics = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        if(!statistics) {
            throw new HttpError(Messages.STATISTICS_NOT_FOUND, 404);
        }

        let updatedStatistics: Statistics;

        if(!isNaN(numberOfHits)){
            statistics.numberOfHits += numberOfHits;
            updatedStatistics = await this.statisticsRepository.saveOrUpdate(statistics);
        }

        if(!isNaN(numberOfClasses)){
            statistics.completedClasses += numberOfClasses;
            updatedStatistics = await this.statisticsRepository.saveOrUpdate(statistics);
        }

        if(!isNaN(numberOfMistakes)) {
            statistics.numberOfMistakes += numberOfMistakes;
            updatedStatistics = await this.statisticsRepository.saveOrUpdate(statistics)
        }

        return updatedStatistics;
    }

    getClassroomCompletedByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const result = await this.statisticsRepository.getClassroomCompletedByUser(userID);

        return result.Statistics_nr_aulas_completas;
    }

    completedGoal = async (userID: number) => {
        let completedGoal: ICompletedGoalProperties = {
            isComplete: false
        };

        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const goalUser = await this.goalRepository.getGoalByUser(userID);

        if(!goalUser) {
            return completedGoal;
        }

        const statisticsExists = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!statisticsExists) {
            throw new HttpError(Messages.STATISTICS_NOT_FOUND, 404);
        }

        if(statisticsExists.dateCompletedGoal !== null) {
            let dataAtual = new Date().setHours(0, 0, 0);
            let dataCompleto = new DateUtils().databaseDateConvertToEua(statisticsExists.dateCompletedGoal);

            if(statisticsExists.completedGoal && dataCompleto < dataAtual) {
                statisticsExists.dayXp = 0;
                statisticsExists.completedGoal = false;
            }
        }

        if(!statisticsExists.completedGoal && statisticsExists.dayXp >= goalUser.value) {
            this.addExperienceToUser(userID, Math.floor(goalUser.value / 5));
            statisticsExists.completedGoal = true;
            statisticsExists.dateCompletedGoal = new Date();

            completedGoal.isComplete = true;
            completedGoal.xp = Math.floor(goalUser.value / 5);

            await this.statisticsRepository.saveOrUpdate(statisticsExists);

            return completedGoal;
        }

        await this.statisticsRepository.saveOrUpdate(statisticsExists);

        return completedGoal;
    }

    clearUserXpMonth = async () => {
        try {
            let diaAtual = new Date().getDate();
            
            if(diaAtual === 1) {
                return await this.statisticsRepository.clearUserXpMonth();
            }
        } catch(e){
            console.log(e)
        }
    }
}


