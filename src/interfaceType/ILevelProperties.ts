import { Statistics } from "../database/model/Statistics"

export default interface ILevelProperties{
    levelID?: number;
    levelNumber: number;
    valueXp: number;
    statistics: Statistics[];
}