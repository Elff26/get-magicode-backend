import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IUserProperties from "../interfaceType/IUserProperties";
import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import UserService from "../service/UserService";

export default class UserController{
    private userRepository: IUserRepository
    private userService: UserService

    constructor(){
        this.userRepository = new UserRepository();
        this.userService = new UserService(this.userRepository);
    }

    createUser = async (request: Request, response: Response, next: NextFunction) => {
        const user: IUserProperties = new UserModel(request.body.user);

        if(!user.nm_usuario|| !user.dt_nascimento || !user.ds_email || !user.nr_telefone || !user.ds_senha || !user.nr_vidas || user.nr_experiencia == undefined 
            || !user.cd_meta || !user.cd_ranking) {
                return next(new HttpError("All fields are required!", 400));
        }

        const result = await this.userService.createUser(user, next);

        response.status(201).send(result);
    }

    findUserById = async (request:Request, response: Response) => {
        const result = await this.userService.findUserById(Number(request.params.cdUsuario));
        response.send(result);
    }

    updateUser = async (request: Request, response: Response, next: NextFunction) => {
        const user: IUserProperties = request.body.user;
        const cdUsuario = Number(request.params.cdUsuario);

        if(isNaN(cdUsuario)) {
            return next(new HttpError('ID must be a number!', 403));
        }

        const result = await this.userService.updateUser(cdUsuario, user, next);

        console.log(result);
        if(result) {
            response.status(200).send(user);
        }
    }

    deleteUSer = async (request: Request, response: Response, next: NextFunction) => {
        const cdUsuario = Number(request.params.cdUsuario);

        if(isNaN(cdUsuario)) {
            return next(new HttpError('ID must be a number!', 403));
        }
        const result = await this.userService.deleteUser(Number(request.params.cdUsuario));

        response.send("Usuário deletado com sucesso!");
    }
    
}
