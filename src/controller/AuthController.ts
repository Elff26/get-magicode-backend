import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";
import UserService from "../service/UserService";

export default class UserController{
    private userRepository: IUserRepository
    private authService: AuthService

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService(this.userRepository);
    }
 
    login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user: ILoginProperties = request.body;

            if(!user.email || !user.password) {
                throw new HttpError("Email or password is invalid!", 400);
            }

            const result = await this.authService.login(user);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }
}
