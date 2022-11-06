import { Goal } from "../database/model/Goal";
import { Statistics } from "../database/model/Statistics";
import { UserAchievement } from "../database/model/UserAchievement";
import { UserTechnology } from "../database/model/UserTechnology";

export default interface IUserProperties {
    userID?: number;
    name: string;
    birthday?: string;
    email: string;
    image?: Buffer | string;
    phone?: string;
    password: string;
    numberOfLifes: number
    lastUpdateNumberOfLifes?: Date;
    createdAt?: Date;
    codeChangePassword?: string;
    expirationDate?: Date;
    goal?: Goal;
    statistics?: Statistics;
    technologies?: UserTechnology[];
    achievements?: UserAchievement[];
    externalID?: string;
    externalToken?: string;
}