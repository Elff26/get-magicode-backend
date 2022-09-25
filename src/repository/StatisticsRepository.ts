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
}