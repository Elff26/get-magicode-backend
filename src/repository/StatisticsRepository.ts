import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Statistics } from "../database/entity/Statistics";
import StatisticsModel from "../model/StatisticsModel";
import IStatisticsRepository from "./interface/IStatisticsRepository";

export default class StatisticsRepository implements IStatisticsRepository {
    private statisticsRepository: Repository<Statistics>

    constructor(){
        this.statisticsRepository = AppDataSource.manager.getRepository(Statistics);
    }

    saveOrUpdate = async (statistics: StatisticsModel) => {
        return await this.statisticsRepository.save(statistics);
    };

    findStatisticsByUser = async (userID: number) => {
        return await this.statisticsRepository.findOne({
            where: {
                user: {
                    userID: userID
                }
            }
        })
    };

    getMounthXpByUser = async (userID: number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select("nr_xp_mes")
                                              .where({user: userID})
                                              .getOne();
    }

    getHigherXP = async () => {
        return await this.statisticsRepository.find({
            order:{
                totalXp: "ASC"
            }
        })
    }

    getCurrentXp = async (userID:number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select(['Statistics.currentXp'])
                                              .where({userID})
                                              .getRawOne();
    }

    getClassroomCompletedByUser = async (userID: number) => {
        return await this.statisticsRepository.createQueryBuilder('Statistics')
                                              .select(['Statistics.completedClasses'])
                                              .where({userID})
                                              .getRawOne();
    }
}