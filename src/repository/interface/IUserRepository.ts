import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../../database/model/User";

export default interface IUserRepository{
    save:(user: User) => Promise<User>;
    createUser:(user: User) => Promise<User>;
    findUserById:(userID: number) => Promise<User | null>;
    updateUser:(user: User) => Promise<User | null>;
    deleteUser:(userID: number) => Promise<DeleteResult>;
    findUserByEmailOrPhone:(email: string, phone: string) => Promise<User | null>;
    findUserByExternalID:(externalID: string) => Promise<User | null>;
    findUserByEmailAndPassword:(email:string, password: string ) => Promise<User | null>;
    findUserByIdAndPassword:(userID:number, password: string ) => Promise<User | null>;
    insertCodeAndDatePasswordbyUser:(code: string, date: string, email: string) => Promise<UpdateResult>;
    verificationResetPassword:(userID: number, passwordReset: string) => Promise<UpdateResult>;
    getGoalByUser:(userID: number) => Promise<any>;
}