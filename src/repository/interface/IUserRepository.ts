import UserModel from "../../model/UserModel";

export default interface IUserRepository{
    createUser:(user:UserModel) => Promise<UserModel>;
}