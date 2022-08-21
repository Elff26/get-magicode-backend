import { User } from "../../database/entity/User";
import UserModel from "../../model/UserModel";

export default interface IUserRepository{
    createUser:(user:UserModel) => Promise<UserModel>;
    findUserById:(cdUsuario:number) => Promise<UserModel | null>;
}