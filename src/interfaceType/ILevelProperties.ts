import { Statistics } from "../database/entity/Statistics"

export default interface ILevelProperties{
    levelID?: number;
    levelNumber: number;
    valueXp: number;
    statistics: Statistics[];
}