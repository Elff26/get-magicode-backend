import { Achievement } from "../database/model/Achievement";
import { User } from "../database/model/User";

export default interface IUserAchievementProperties {
    userAchievementID?: number;
    user: User;
    achievement: Achievement;
    unlocked: boolean;
}