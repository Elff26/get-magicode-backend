import { Achievement } from "../../database/model/Achievement";

export default interface IAchievementRepository{
    saveOrUpdate: (achievement: Achievement) => Promise<Achievement>;
    listAllAchievements:() => Promise<Achievement[]>;
    findAchievementByID:(achievementID: number) => Promise<Achievement | null>;
}