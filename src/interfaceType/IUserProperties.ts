import GoalModel from "../model/GoalModel";
import UserTechnologyModel from "../model/UserTechnologyModel";

export default interface IUserProperties {
    userID: number;
    name: string
    birthday: string
    email: string
    phone: string
    password: string
    numberOfLifes: number
    xp: number
    createdAt?: Date
    goal: GoalModel
    ranking: number
    codeChangePassword: string
    expirationDate: Date
    technologies: UserTechnologyModel[]
}