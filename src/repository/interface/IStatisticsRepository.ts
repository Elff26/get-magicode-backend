import { UpdateResult } from "typeorm";
import { Statistics } from "../../database/entity/Statistics";
import StatisticsModel from "../../model/StatisticsModel";

export default interface IStatisticsRepository {
    saveOrUpdate:(statistics: StatisticsModel) => Promise<StatisticsModel>;
    findStatisticsByUser:(userID: number) => Promise<StatisticsModel | null>;
    getMounthXpByUser:(userID: number) => Promise<StatisticsModel | null>;
    getHigherXP:() => Promise<Statistics[]>;
    getCurrentXp:(userID: number) => Promise<any>;
    getClassroomCompletedByUser:(userID: number) => Promise<any>;
}