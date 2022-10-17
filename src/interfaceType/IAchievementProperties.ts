import { Technology } from "../database/model/Technology";
import { UserAchievement } from "../database/model/UserAchievement";

export default interface IAchievementProperties {
    achievementID: number,
    name: string,
    description: string,
    image: string,
    xp: number;
    classroom: number;
    technology: Technology;
    users: UserAchievement[]
}