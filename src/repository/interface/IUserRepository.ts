import UserModel from "../../model/UserModel";

export default class IUserRepository{
    createUser:(user:UserModel) => Promise<UserModel>;
}