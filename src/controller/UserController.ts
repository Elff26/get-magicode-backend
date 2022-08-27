import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IUserProperties from "../interfaceType/IUserProperties";
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

    getUser = (request: Request, response: Response) => {
        response.send("Teste")
    }

    createUser = (request: Request, response: Response)=>{
        this.userService.createUser(request.body.user);
        response.send("Usuário criado com sucesso!");
    }

    findUserById = async (request:Request, response: Response) => {
        const result = await this.userService.findUserById(Number(request.params.cdUsuario));
        response.send(result);
    }

    updateUSer = async (request: Request, response: Response, next: NextFunction) => {
        const user: IUserProperties = request.body;
        const cdUsuario = Number(request.params.cdUsuario);

        if(isNaN(cdUsuario)) {
            return next(new HttpError('ID must be a number!', 403));
        }

        const result = await this.userService.updateUser(cdUsuario, user, next);

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
