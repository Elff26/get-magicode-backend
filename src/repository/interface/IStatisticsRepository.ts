import StatisticsModel from "../../model/StatisticsModel";

export default interface IStatisticsRepository {
    saveOrUpdate:(statistics: StatisticsModel) => Promise<StatisticsModel>;
    findStatisticsByUser:(userID: number) => Promise<StatisticsModel | null>;
}