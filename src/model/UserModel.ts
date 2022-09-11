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
        this.xp = user.xp;
        this.createdAt = user.createdAt;
        this.goal = user.goal;
        this.ranking = user.ranking;
        this.codeChangePassword = user.codeChangePassword;
        this.expirationDate = user.expirationDate;
        this.technologies = user.technologies;
    }

    userID: number
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