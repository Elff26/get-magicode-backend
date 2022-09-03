import { DeleteResult, Repository } from "typeorm";
import { User } from "../database/entity/User";
import UserModel from "../model/UserModel";
import IUserRepository from "./interface/IUserRepository";
import { AppDataSource } from "../../data-source";

export default class UserRepository implements IUserRepository{
    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = AppDataSource.manager.getRepository(User);
    }

    createUser = async (user: UserModel) =>{
        return await this.userRepository.save(user);
    }

    findUserById = async (userID: number) => {
        return await this.userRepository.findOneBy({
            userID: userID,
        })
    }

    findUserByEmailOrPhone = async (email: string, phone: string) => {
        return await this.userRepository.createQueryBuilder('User')
            .where({
                email
            })
            .orWhere({
                phone
            })
            .getOne();
    }

    updateUser = async (user: UserModel) => {
        return await this.userRepository.save(user);
    }

    deleteUser = async (userID: number) => {
        return await this.userRepository.delete({
            userID,
        });
    }

    findUserByEmailAndPassword = async (email: string, password: string) => {
        return await this.userRepository.createQueryBuilder('User')
            .where({
                email
            })
            .andWhere({
                password
            })
            .getOne();
    }

    insertCodeAndDatePasswordbyUser = async(code: number, date: string, email: string) =>{
        return await this.userRepository.createQueryBuilder()
                                        .update('User')
                                        .set({codeChangePassword:code, expirationDate: date})
                                        .where({email})
                                        .execute();
    }
}