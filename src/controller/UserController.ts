import { Request, Response } from "express";
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

    getUser = (req: Request, res:Response) => {
        res.send("Teste")
    }

    createUser = (req:Request, res:Response)=>{
        const userService = new UserService(this.userRepository);

        userService.createUser(req.body.user);
        res.send("Usuário criado com sucesso!")
    }

    findUserById = async (req:Request, res:Response) => {
        const user = await this.userService.findUserById(Number(req.params.cdUsuario));
        res.send(user)
    }
    
}