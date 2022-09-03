import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../../database/entity/User";
import UserModel from "../../model/UserModel";

export default interface IUserRepository{
    createUser:(user: UserModel) => Promise<UserModel>;
    findUserById:(userID: number) => Promise<UserModel | null>;
    updateUser:(user: UserModel) => Promise<UserModel | null>;
    deleteUser:(userID: number) => Promise<DeleteResult>;
    findUserByEmailOrPhone:(email: string, phone: string) => Promise<UserModel | null>;
    findUserByEmailAndPassword:(email:string, password: string ) => Promise<UserModel | null>;
    insertCodeAndDatePasswordbyUser:(code: number, date: string, email: string) => Promise<UpdateResult>;
}