import { Statistics } from "../database/entity/Statistics";
import ILevelProperties from "../interfaceType/ILevelProperties";

export default class LevelModel {
    constructor(level: ILevelProperties){
        this.levelID = level.levelID;
        this.levelNumber = level.levelNumber;
        this.valueXp = level.valueXp;
        this.statistics = level.statistics;
    }
    
    levelID?: number
    levelNumber: number
    valueXp: number
    statistics: Statistics[]
}