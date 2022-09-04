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
    goal: number
    ranking: number
    codeChangePassword: string
    expirationDate: Date
}