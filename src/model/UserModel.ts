import UserProperties from "../interfaceType/IUserProperties";

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
    goal: number
    ranking: number
}