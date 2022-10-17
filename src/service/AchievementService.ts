import { Achievement } from "../database/model/Achievement";
import HttpError from "../exceptions/HttpError";
import IAchievementProperties from "../interfaceType/IAchievementProperties";
import IUserAchievementProperties from "../interfaceType/IUserAchievementProperties";
import IAchievementRepository from "../repository/interface/IAchievementRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserAchievementRepository from "../repository/interface/IUserAchievementRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import arrayMap from "../utils/ArrayMap";

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
            throw new HttpError('Achievement Not Found!', 404);
        }

        return achievementExists;
    }

    listAllAchievements = async () => {
        return await this.achievementRepository.listAllAchievements();
    }

    associateUserToAchievement = async (userID: number, technologyID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        const statisticsExists = await this.statisticsRepository.findStatisticsByUser(userID);

        if(!statisticsExists) {
            throw new HttpError('Statistics not found!', 404);
        }

        const listAchievementUserHave = await this.achievementRepository.listAchievementUserHave(userID);

        const listAchivementUserNotHaveByXP = await this.achievementRepository.listAchivementUserNotHaveByXP(statisticsExists.totalXp, listAchievementUserHave);

        const listAchivementUserNotHaveByClassroom = await this.achievementRepository.listAchivementUserNotHaveByClassroom(statisticsExists.completedClasses, listAchievementUserHave);

        const listAchivementUserNotHaveByTechnology = await this.achievementRepository.listAchivementUserNotHaveByTechnology(technologyID, listAchievementUserHave);

        const listAchivementUserNotHaveByTechnologyAndClassroom = await this.achievementRepository.listAchivementUserNotHaveByTechnologyAndClassroom(statisticsExists.completedClasses, technologyID, listAchievementUserHave);

        let listUserAchievements: Achievement[] = listAchivementUserNotHaveByXP.concat(listAchivementUserNotHaveByClassroom,listAchivementUserNotHaveByTechnology,listAchivementUserNotHaveByTechnologyAndClassroom);
        console.log(listUserAchievements, "listUserAchievements")
        
        const response: any = arrayMap(listUserAchievements, userExists);
        console.log(response, "response")

        const result = await this.userAchievementRepository.saveList(response);
    
        if(!result) {
            throw new HttpError('Error when trying associate user with challenge. Try again later!', 400);
        }

        return result;
    }

        
    listAchievementUserHave = async(userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.achievementRepository.listAchievementUserHave(userID);

        return result;
    }
}