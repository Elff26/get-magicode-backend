import { DeleteResult } from "typeorm";
import { User } from "../../database/entity/User";
import UserModel from "../../model/UserModel";

export default interface IUserRepository{
    createUser:(user:UserModel) => Promise<UserModel>;
    findUserById:(cdUsuario:number) => Promise<UserModel | null>;
    updateUser:(user: UserModel) => Promise<UserModel | null>;
    deleteUser:(cdUsuario:number) => Promise<DeleteResult>;
    findUserByEmailOrPhone:(ds_email: string, nr_telefone: string) => Promise<UserModel | null>;
}