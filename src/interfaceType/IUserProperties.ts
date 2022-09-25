import { Statistics } from "../database/entity/Statistics";
import { UserAchievement } from "../database/entity/UserAchievement";
import GoalModel from "../model/GoalModel";
import UserTechnologyModel from "../model/UserTechnologyModel";

export default interface IUserProperties {
    userID: number;
    name: string;
    birthday: string;
    email: string;
    image?: string;
    phone: string;
    password: string;
    numberOfLifes: number
    lastUpdateNumberOfLifes: Date;
    createdAt?: Date;
    codeChangePassword: string;
    expirationDate: Date;
    goal: GoalModel;
    statistics: Statistics;
    technologies: UserTechnologyModel[];
    achievements: UserAchievement[];
}