import { UserAchievement } from "../database/model/UserAchievement";

export default interface IAchievementProperties {
    achievementID: number,
    name: string,
    description: string,
    image: string,
    users: UserAchievement[]
}