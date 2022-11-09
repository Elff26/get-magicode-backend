import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../../database/model/User";

export default interface IUserRepository{
    save:(user: User) => Promise<User>;
    createUser:(user: User) => Promise<User>;
    findUserById:(userID: number) => Promise<User | null>;
    updateUser:(user: User) => Promise<User | null>;
    deleteUser:(userID: number) => Promise<DeleteResult>;
    findUserByEmail:(email: string) => Promise<User | null>;
    findUserWithPasswordByEmail:(email: string) => Promise<User | null>;
    findUserWithPasswordById:(id: number) => Promise<User | null>;
    findUserWithRefreshTokenById:(userID: number) => Promise<User | null>;
    findUserByEmailOrPhone:(email: string, phone: string) => Promise<User | null>;
    findUserByExternalID:(externalID: string) => Promise<User | null>;
    findUserByEmailAndPassword:(email:string, password: string ) => Promise<User | null>;
    findUserByIdAndPassword:(userID:number, password: string ) => Promise<User | null>;
    insertCodeAndDatePasswordbyUser:(code: string, date: string, email: string) => Promise<UpdateResult>;
    verificationResetPassword:(userID: number, passwordReset: string) => Promise<UpdateResult>;
    getImageByUser:(userID:number) => Promise<User>;
}