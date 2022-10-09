import { Level } from "../database/entity/Level";
import UserModel from "../model/UserModel";

export default interface IStatisticsProperties {
    statisticID: number;
    currentXp: number;
    totalXp: number;
    mounthXp: number;
    dayXp: number;
    completedClasses: number;
    numberOfHits: number;
    numberOfMistakes: number;
    user: UserModel;
    level: Level;

    addExperienceToUser: () => void;
}