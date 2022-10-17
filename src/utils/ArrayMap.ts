import { Achievement } from "../database/model/Achievement";
import { User } from "../database/model/User";
import { UserAchievement } from "../database/model/UserAchievement";
import IUserAchievementProperties from "../interfaceType/IUserAchievementProperties";

const arrayMap = (array: Achievement[], userExists: User) =>{
    return array.map((achievement:Achievement) => {
            const userAchievement: IUserAchievementProperties = {
                user: userExists,
                achievement: achievement,
                unlocked: true
            }

            return userAchievement;
        });
}

export default arrayMap;