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

    findUserById = async (cdUsuario:number) => {
        return await this.userRepository.findOneBy({
            cd_usuario: cdUsuario,
        })
    }

    updateUser = async (user: UserModel) => {
        console.log(user);
        return await this.userRepository.save(user);
    }

    deleteUser = async (cdUsuario: number) => {
        return await this.userRepository.delete({
            cd_usuario: cdUsuario,
        });
    }
}