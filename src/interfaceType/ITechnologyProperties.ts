import UserModel from "../model/UserModel";

export default interface ITechnologyProperties {
    technologyID: number;
    name: string
    users?: UserModel[]
}