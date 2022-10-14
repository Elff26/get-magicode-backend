import HttpError from "../exceptions/HttpError";
import IAchievementProperties from "../interfaceType/IAchievementProperties";
import IUserAchievementProperties from "../interfaceType/IUserAchievementProperties";
import IAchievementRepository from "../repository/interface/IAchievementRepository";
import IUserAchievementRepository from "../repository/interface/IUserAchievementRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class AchievementService{
    private userRepository: IUserRepository;
    private achievementRepository: IAchievementRepository;
    private userAchievementRepository: IUserAchievementRepository;

    constructor(userRepository: IUserRepository, achievementRepository: IAchievementRepository, userAchievementRepository: IUserAchievementRepository){
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.userAchievementRepository = userAchievementRepository;
    }

    createAchievement = async (achievement: IAchievementProperties) => {
        console.log(achievement, "service")
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

    associateUserToAchievement = async (userID: number, achievementID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        const achievementExists = await this.achievementRepository.findAchievementByID(achievementID);

        if(!achievementExists) {
            throw new HttpError('Achievement not found!', 404);
        }

        const userAchievementExists = await this.userAchievementRepository.findByUserAchievementByUserAndAchievement(userExists.userID, achievementExists.achievementID);

        if(!userAchievementExists) {
            const userAchievement: IUserAchievementProperties = {
                user: userExists,
                achievement: achievementExists,
                completed: false
            }
    
            const result = await this.userAchievementRepository.saveOrUpdate(userAchievement);
    
            if(!result) {
                throw new HttpError('Error when trying associate user with challenge. Try again later!', 400);
            }

            return result;
        }
        
        return userAchievementExists;
    }
}