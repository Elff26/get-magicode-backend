import { Level } from "../database/model/Level";
import { User } from "../database/model/User";

export default interface IStatisticsProperties {
    statisticID: number;
    currentXp: number;
    totalXp: number;
    monthXp: number;
    dayXp: number;
    completedClasses: number;
    numberOfHits: number;
    numberOfMistakes: number;
    completedGoal: boolean;
    user: User;
    level: Level;

    addExperienceToUser: () => void;
}