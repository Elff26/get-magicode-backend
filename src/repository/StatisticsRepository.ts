import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Statistics } from "../database/model/Statistics";
import IStatisticsRepository from "./interface/IStatisticsRepository";

export default class StatisticsRepository implements IStatisticsRepository {
    private statisticsRepository: Repository<Statistics>

    constructor(){
        this.statisticsRepository = AppDataSource.manager.getRepository(Statistics);
    }

    saveOrUpdate = async (statistics: Statistics) => {
        return await this.statisticsRepository.save(statistics);
    };

    findStatisticsByUser = async (userID: number) => {
        return await this.statisticsRepository.findOne({
            where:{
                user:{
                    userID: userID
                }
            }
        });
    };

    getMonthXpByUser = async (userID: number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select("Statistics.monthXp")
                                              .where({user: userID})
                                              .getOne();
    }

    getHigherXP = async (type: string) => {

        if(type === 'general'){
            return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .innerJoinAndSelect('Statistics.user', 'u')
                                              .select(['Statistics.totalXp', 'u'])
                                              .orderBy('Statistics.totalXp', 'DESC')
                                              .getMany();
        }

        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .innerJoinAndSelect('Statistics.user', 'u')
                                              .select(['Statistics.monthXp', 'u'])
                                              .orderBy('Statistics.monthXp', 'DESC')
                                              .getMany();
        
    }

    getCurrentXp = async (userID:number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select(['Statistics.currentXp'])
                                              .where("Statistics.user = :userID",{userID})
                                              .getRawOne();
    }

    getClassroomCompletedByUser = async (userID: number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select(['Statistics.completedClasses'])
                                              .where("Statistics.user = :userID",{userID})
                                              .getRawOne();
    }

    clearUserXpMonth = async () => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                        .update()
                                        .set({
                                            monthXp: 0
                                        })
                                        .execute();
    }
}