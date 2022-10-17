import { Achievement } from "../../database/model/Achievement";
import { UserAchievement } from "../../database/model/UserAchievement";

export default interface IUserAchievementRepository {
    saveOrUpdate:(userAchievement: UserAchievement) => Promise<UserAchievement>;
    findByUserAchievementByUserAndAchievement:(userID: number, achievementID: number) => Promise<UserAchievement | null>;
    saveList:(achievement: UserAchievement[]) => Promise<UserAchievement[]>;
}