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

    constructor() {
        this.userRepository = new UserRepository();
        this.userService = new UserService(this.userRepository);
    }

    createUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user: IUserProperties = new UserModel(request.body.user);

            if(!user.name || !user.birthday || !user.email || !user.phone || !user.password) {
                throw new HttpError("All fields are required!", 400);
            }
    
            const result = await this.userService.createUser(user);
    
            response.status(201).send({ user: result });
        } catch(error: any) {
            next(error)
        }
    }

    findUserById = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.userService.findUserById(Number(request.params.userID));
    
            response.status(200).json({ user: result });
        }  catch(error: any) {
            next(error)
        }
    }

    updateUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user: IUserProperties = request.body.user;
            const userID = Number(request.params.userID);
    
            if(isNaN(userID)) {
                throw new HttpError('ID must be a number!', 403);
            }
    
            const result = await this.userService.updateUser(userID, user);
    
            response.status(200).json({ user: user, result: result });
        }  catch(error: any) {
            next(error)
        }
    }

    deleteUSer = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number!', 403);
            }
    
            const result = await this.userService.deleteUser(Number(request.params.userID));
    
            response.json({ message: "Usuário deletado com sucesso!" });
        }  catch(error: any) {
            next(error)
        }
    }

    insertCodeAndDatePasswordbyUser = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const email = request.body.email;

            const userID = await this.userService.insertCodeAndDatePasswordbyUser(email);

            response.status(200).json({ message: "Codigo e Data de Expiração gerados com sucesso!", userID});

        }catch(error: any){
            next(error)
        }
    }

    verificationCode = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID);
            const code = request.body.codeChangePassword;
            
            if(isNaN(userID)){
                throw new HttpError('ID must be a number!', 403);
            }

            const result = await this.userService.verificationCode(code, userID)

            response.status(200).json({ message: "Código verificado com sucesso"});
            
        }catch(error: any){
            next(error)
        }
    }

    decreaseNumberOfLifes = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID)

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.userService.decreaseNumberOfLifes(userID);
    
            response.status(200).json({ numberOfLifes: result?.numberOfLifes, lastUpdateNumberOfLifes: result?.lastUpdateNumberOfLifes });
        }  catch(error: any) {
            next(error)
        }
    }

    addUserLife = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID)

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.userService.addUserLife(userID);
    
            response.status(200).json({ numberOfLifes: result?.numberOfLifes });
        }  catch(error: any) {
            next(error)
        }
    }

    getNumberOfLifes = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID)

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }
    
            const result = await this.userService.getNumberOfLifes(userID);
    
            response.status(200).json({ numberOfLifes: result });
        }  catch(error: any) {
            next(error)
        }
    }
}
