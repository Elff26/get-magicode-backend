import { NextFunction } from "express";
import HttpError from "../exceptions/HttpError";
import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = (user:UserModel) => {
        return this.userRepository.createUser(user);
    }

    findUserById = async (cdUsuario:number) => {
        return await this.userRepository.findUserById(cdUsuario);
    }

    updateUser = async (cdUsuario: number, user: UserModel, next: NextFunction) => {
        const userExists = await this.userRepository.findUserById(cdUsuario);

        if(!userExists) {
            return next(new HttpError('User not found!', 404))
        } 

        user.cd_usuario = userExists.cd_usuario;
        user.ds_senha = user.ds_senha;

        return this.userRepository.updateUser(user);
    }   
}