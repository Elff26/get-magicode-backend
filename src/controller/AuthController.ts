import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IChangePassProperties from "../interfaceType/IChangePassProperties";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";
import Messages from "../utils/Messages";

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
                throw new HttpError(Messages.EMAIL_OR_PASSWORD_INVALID, 400);
            }

            const result = await this.authService.login(user);
            
            response.status(200).json({ userInfo: result });
        } catch(error: any) {
            next(error);
        }
    }

    changePassword = async (request: Request, response: Response, next: NextFunction) => {
       try {
            const user: IChangePassProperties = request.body;
            const userID = Number(request.params.userID);
    
            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.authService.changePassword(userID, user.password, user.newPassword)
            response.status(200).json({ user: result });
            
       } catch(error: any) {
        next(error);
       }
    }
}
