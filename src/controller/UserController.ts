import { Request, Response } from "express";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import UserService from "../service/UserService";

export default class UserController{
    private userRepository: IUserRepository

    constructor(){
        this.userRepository = new UserRepository();
    }

    getUser = (req: Request, res:Response) => {
        res.send("Teste")
    }

    postUser = (req:Request, res:Response)=>{
        const userService = new UserService(this.userRepository);

        userService.createUser(req.body.user);
        res.send("Usuário criado com sucesso!")
    }
}