import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../../database/entity/User";
import UserModel from "../../model/UserModel";

export default interface IUserRepository{
    save:(user: UserModel) => Promise<UserModel>;
    createUser:(user: UserModel) => Promise<UserModel>;
    findUserById:(userID: number) => Promise<UserModel | null>;
    updateUser:(user: UserModel) => Promise<UserModel | null>;
    deleteUser:(userID: number) => Promise<DeleteResult>;
    findUserByEmailOrPhone:(email: string, phone: string) => Promise<User | null>;
    findUserByEmailAndPassword:(email:string, password: string ) => Promise<User | null>;

    findUserByIdAndPassword:(userID:number, password: string ) => Promise<User | null>;

    insertCodeAndDatePasswordbyUser:(code: string, date: string, email: string) => Promise<UpdateResult>;

    verificationResetPassword:(userID: number, passwordReset: string) => Promise<UpdateResult>;

}