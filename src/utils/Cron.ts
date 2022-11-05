import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import UserService from "../service/UserService";
import cron from 'node-cron';
import StatisticsService from "../service/StatisticsService";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IGoalRepository from "../repository/interface/IGoalRepository";
import LevelRepository from "../repository/LevelRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import GoalRepository from "../repository/GoalRepository";

export default class Cron {
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;
    private goalRepository: IGoalRepository;
    private statisticsService: StatisticsService;

    constructor() {
        this.userRepository = new UserRepository();
        this.levelRepository = new LevelRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.goalRepository = new GoalRepository();
        this.statisticsService = new StatisticsService(this.statisticsRepository, this.userRepository, this.levelRepository, this.goalRepository);
    }

    clearUserXpDaily = async () => {
        cron.schedule("*/1 * * * *", async () => {
            await this.statisticsService.clearUserXpMonth();
        });
    }
}