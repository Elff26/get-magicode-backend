import { Achievement } from "../database/model/Achievement";
import HttpError from "../exceptions/HttpError";
import IAchievementProperties from "../interfaceType/IAchievementProperties";
import IUserAchievementProperties from "../interfaceType/IUserAchievementProperties";
import IAchievementRepository from "../repository/interface/IAchievementRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserAchievementRepository from "../repository/interface/IUserAchievementRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import arrayMap from "../utils/ArrayMap";
import Messages from "../utils/Messages";

export default class AchievementService{
    private userRepository: IUserRepository;
    private achievementRepository: IAchievementRepository;
    private userAchievementRepository: IUserAchievementRepository;
    private statisticsRepository: IStatisticsRepository;

    constructor(userRepository: IUserRepository, achievementRepository: IAchievementRepository, userAchievementRepository: IUserAchievementRepository, statisticsRepository: IStatisticsRepository){
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.statisticsRepository = statisticsRepository;
    }

    createAchievement = async (achievement: IAchievementProperties) => {
        return await this.achievementRepository.saveOrUpdate(achievement);
    }
    
    findAchievementByID = async (achievementID: number) => {
        const achievementExists = await this.achievementRepository.findAchievementByID(achievementID);

        if (!achievementExists) {
            throw new HttpError(Messages.ACHIEVEMENT_NOT_FOUND, 404);
        }

        return achievementExists;
    }

    listAllAchievements = async () => {
        return await this.achievementRepository.listAllAchievements();
    }

    associateUserToAchievement = async (userID: number, technologyID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const statisticsExists = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!statisticsExists) {
            throw new HttpError(Messages.STATISTICS_NOT_FOUND, 404);
        }

        const listAchievementUserHave = await this.achievementRepository.listAchievementUserHave(userID);

        if(listAchievementUserHave.length === 0) {
            listAchievementUserHave.push(0);
        }

        const listAchivementUserNotHaveByXP = await this.achievementRepository.listAchivementUserNotHaveByXP(statisticsExists.totalXp, listAchievementUserHave);

        const listAchivementUserNotHaveByClassroom = await this.achievementRepository.listAchivementUserNotHaveByClassroom(statisticsExists.completedClasses, listAchievementUserHave);

        const listAchivementUserNotHaveByTechnology = await this.achievementRepository.listAchivementUserNotHaveByTechnology(technologyID, listAchievementUserHave);

        const listAchivementUserNotHaveByTechnologyAndClassroom = await this.achievementRepository.listAchivementUserNotHaveByTechnologyAndClassroom(statisticsExists.completedClasses, technologyID, listAchievementUserHave);

        let listUserAchievements: Achievement[] = listAchivementUserNotHaveByXP.concat(listAchivementUserNotHaveByClassroom,listAchivementUserNotHaveByTechnology,listAchivementUserNotHaveByTechnologyAndClassroom);
        const response: any = arrayMap(listUserAchievements, userExists);
        const result = await this.userAchievementRepository.saveList(response);

        if(!result) {
            throw new HttpError(Messages.ASSOCIATE_USER_TECHNOLOGY, 400);
        }

        return result;
    }

        
    listAchievementUserHave = async(userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const result = await this.achievementRepository.listAchievementUserHave(userID);

        return result;
    }
}