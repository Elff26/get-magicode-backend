import { Request, Response } from "express";
import UserService from "../service/UserService";

export default class UserController{
    private userService:UserService

    constructor(){
        this.userService = new UserService();
    }

    getUser = (req: Request, res:Response) => {
        res.send("Teste")
    }

    postUser = (req:Request, res:Response)=>{
        this.userService.createUser(req.body.user);
        res.send("Usuário criado com sucesso!")
    }
}