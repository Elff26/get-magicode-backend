import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IChangePassProperties from "../interfaceType/IChangePassProperties";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";

export default class UserController{
    private userRepository: IUserRepository;
    private authService: AuthService;

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
            
            response.status(200).json({ data: result });
        } catch(error: any) {
            next(error);
        }
    }

    changePassword = async (request: Request, response: Response, next: NextFunction) => {
       try {
            const user: IChangePassProperties = request.body;
            const userID = Number(request.params.userID);
    
            if(isNaN(userID)) {
                throw new HttpError('ID must be a number!', 403);
            }

            const result = await this.authService.changePassword(userID, user.password, user.newPassword)
            response.status(200).json({ user: result });
            
       } catch(error: any) {
        next(error);
       }
    }
}
