import { Repository } from "typeorm";
import { User } from "../database/entity/User";
import UserModel from "../model/UserModel";
import IUserRepository from "./interface/IUserRepository";
import { AppDataSource } from "../../data-source";

export default class UserRepository implements IUserRepository{
    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = AppDataSource.manager.getRepository(User);
    }

    createUser = async (user:UserModel) =>{
        return await this.userRepository.save(user);
    }
}