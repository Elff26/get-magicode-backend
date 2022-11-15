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

    
    listAchievementUserHave = async (userID:number) => {
        const achievementIDs = await this.achievementRepository.createQueryBuilder('Achievement')
                                                                .leftJoinAndSelect('Achievement.users', 'ua')
                                                                .where('ua.user = :userID', {userID})
                                                                .select(['Achievement.achievementID'])
                                                                .getMany();

        return achievementIDs.map((achievements) => achievements.achievementID);                            
    }

    listAchivementUserNotHaveByXP = async (xpUser:number, listAchievements: number[]) => {
        return await this.achievementRepository.createQueryBuilder('Achievement')
                                               .where('Achievement.achievementID NOT IN(:...ids)', {ids:listAchievements})
                                               .andWhere('Achievement.xp <= :xpUser',{xpUser})
                                               .andWhere('Achievement.classroom IS NULL')
                                               .andWhere('Achievement.technology IS NULL')
                                               .getMany();

    }

    listAchivementUserNotHaveByClassroom = async (classroomUser:number, listAchievements: number[]) => {
        return await this.achievementRepository.createQueryBuilder('Achievement')
                                               .where('Achievement.achievementID NOT IN(:...ids)', {ids:listAchievements})
                                               .andWhere('Achievement.classroom <= :classroomUser',{classroomUser})
                                               .andWhere('Achievement.xp IS NULL')
                                               .andWhere('Achievement.technology IS NULL')
                                               .getMany();

    }

    listAchivementUserNotHaveByTechnology = async (technologyUser:number, listAchievements: number[]) => {
        return await this.achievementRepository.createQueryBuilder('Achievement')
                                               .where('Achievement.achievementID NOT IN(:...ids)', {ids:listAchievements})
                                               .andWhere('Achievement.technology = :technologyUser',{technologyUser})
                                               .andWhere('Achievement.xp IS NULL')
                                               .andWhere('Achievement.classroom IS NULL')
                                               .getMany();

    }

    listAchivementUserNotHaveByTechnologyAndClassroom = async (classroomUser:number,technologyUser:number, listAchievements: number[]) => {
        return await this.achievementRepository.createQueryBuilder('Achievement')
                                               .where('Achievement.achievementID NOT IN(:...ids)', {ids:listAchievements})
                                               .andWhere('Achievement.technology = :technologyUser AND Achievement.classroom <= :classroomUser',{technologyUser, classroomUser})
                                               .andWhere('Achievement.xp IS NULL')
                                               .getMany();

    }
}