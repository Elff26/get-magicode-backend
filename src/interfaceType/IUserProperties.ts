import GoalModel from "../model/GoalModel";
import TechnologyModel from "../model/TechnologieModel";

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
    technologies: TechnologyModel[]
}