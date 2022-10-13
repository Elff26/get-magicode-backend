import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { UserAchievement } from "../database/model/UserAchievement";
import IUserAchievementRepository from "./interface/IUserAchievementRepository";

export default class UserAchievementRepository implements IUserAchievementRepository {
    private userAchievementRepository: Repository<UserAchievement>;

    constructor(){
        this.userAchievementRepository = AppDataSource.manager.getRepository(UserAchievement);
    }

    saveOrUpdate = (userAchievement: UserAchievement) => {
        return this.userAchievementRepository.save(userAchievement);
    };

    findByUserAchievementByUserAndAchievement = async (userID: number, achievementID: number) => {
        return await this.userAchievementRepository.findOne({
            where: {
                user: {
                    userID: userID
                },
                achievement: {
                   achievementID: achievementID
                }
            }
        })
    }
}