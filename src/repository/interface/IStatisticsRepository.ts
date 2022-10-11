import { Statistics } from "../../database/model/Statistics";

export default interface IStatisticsRepository {
    saveOrUpdate:(statistics: Statistics) => Promise<Statistics>;
    findStatisticsByUser:(userID: number) => Promise<Statistics | null>;
    getMonthXpByUser:(userID: number) => Promise<Statistics | null>;
    getHigherXP:(type: string) => Promise<Statistics[]>;
    getCurrentXp:(userID: number) => Promise<any>;
    getClassroomCompletedByUser:(userID: number) => Promise<any>;
}