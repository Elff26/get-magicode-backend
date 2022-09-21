import { UserAchievement } from "../database/entity/UserAchievement";
import UserProperties from "../interfaceType/IUserProperties";
import GoalModel from "./GoalModel";
import UserTechnologyModel from "./UserTechnologyModel";

export default class UserModel{
    constructor(user: UserProperties){
        this.userID = user.userID;
        this.name = user.name;
        this.birthday = user.birthday;
        this.email = user.email;
        this.phone = user.phone;
        this.password = user.password;
        this.numberOfLifes = user.numberOfLifes;
        this.createdAt = user.createdAt;
        this.codeChangePassword = user.codeChangePassword;
        this.expirationDate = user.expirationDate;
        this.goal = user.goal;
        this.technologies = user.technologies;
        this.statistics = user.statistics;
    }

    userID: number
    name: string
    birthday: string
    email: string
    phone: string
    password: string
    numberOfLifes: number
    createdAt?: Date
    codeChangePassword: string
    expirationDate: Date
    goal: GoalModel
    statistics: any; // MUDAR DEPOIS
    technologies: UserTechnologyModel[];
    achievements: any; // MUDAR DEPOIS
}