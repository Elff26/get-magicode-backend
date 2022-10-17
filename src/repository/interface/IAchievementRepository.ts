import { Achievement } from "../../database/model/Achievement";

export default interface IAchievementRepository{
    saveOrUpdate: (achievement: Achievement) => Promise<Achievement>;
    listAllAchievements:() => Promise<Achievement[]>;
    findAchievementByID:(achievementID: number) => Promise<Achievement | null>;
    listAchievementUserHave:(userID:number) => Promise<number[]>;
    listAchivementUserNotHaveByXP:(xpUser:number, listAchievements: number[]) => Promise<Achievement[]>;
    listAchivementUserNotHaveByClassroom:(classroomUser:number, listAchievements: number[]) => Promise<Achievement[]>;
    listAchivementUserNotHaveByTechnology:(technologyUser:number, listAchievements: number[]) => Promise<Achievement[]>;
    listAchivementUserNotHaveByTechnologyAndClassroom:(classroomUser:number,technologyUser:number, listAchievements: number[]) => Promise<Achievement[]>;
}