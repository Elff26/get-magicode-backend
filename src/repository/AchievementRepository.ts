import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Achievement } from "../database/model/Achievement";
import IAchievementRepository from "./interface/IAchievementRepository";

export default class AchievementRepository implements IAchievementRepository{
    private achievementRepository: Repository<Achievement>;
    constructor(){
        this.achievementRepository = AppDataSource.manager.getRepository(Achievement);
    }

    saveOrUpdate = async (achievement: Achievement) => {
        return await this.achievementRepository.save(achievement);
    };

    listAllAchievements = async () => {
        return await this.achievementRepository.createQueryBuilder('Achievement')
                                              .select("Achievement")
                                              .getMany();
    }

    findAchievementByID = async (achievementID: number) => {
        return await this.achievementRepository.findOneBy({
            achievementID: achievementID
        });
    }
}