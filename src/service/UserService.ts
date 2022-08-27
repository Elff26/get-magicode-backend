import { NextFunction } from "express";
import { IsNull } from "typeorm";
import HttpError from "../exceptions/HttpError";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = async (user: UserModel, next: NextFunction) => {
        const userExists = await this.userRepository.findUserByEmailOrPhone(user.ds_email, user.nr_telefone);

        if(userExists) {
            return next(new HttpError('This email/phone already exists!', 409))
        }

        return await this.userRepository.createUser(user);
    }

    findUserById = async (cdUsuario:number, next: NextFunction) => {
        const userExists = await this.userRepository.findUserById(cdUsuario);
        
        if(!userExists) {
            return next(new HttpError('User not found!', 404));
        }

        return userExists;
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
    
    deleteUser = async (cdUsuario: number) => {
        return await this.userRepository.deleteUser(cdUsuario);
    }

    loginUser = async (user: IUserProperties, next: NextFunction) => {
        const userExists = await this.userRepository.loginUser(user.ds_email, user.ds_senha);
        
        if(!userExists) {
            return next(new HttpError('User not found!', 404))
        }

        return userExists;
    }
}