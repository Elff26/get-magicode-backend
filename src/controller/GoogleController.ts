import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import GoogleService from "../service/GoogleService";

export default class GoogleController {
    private userRepository: IUserRepository;
    private googleService: GoogleService;

    constructor() {
        this.userRepository = new UserRepository();
        this.googleService = new GoogleService(this.userRepository);
    }

    siginWithGoogle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const googleCode: string = request.body.googleCode;

            if(!googleCode) {
                throw new HttpError("Error when trying to connect to google!", 400);
            }
    
            const result = await this.googleService.siginWithGoogle(googleCode);
    
            response.status(201).send(result);
        } catch(error: any) {
            next(error)
        }
    }

    checkGoogleToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const googleToken: string | string[] | undefined = request.headers.accesstoken;

            if(!googleToken || typeof(googleToken) !== "string") {
                throw new HttpError("Token is required!", 400);
            }
    
            const result = await this.googleService.checkGoogleToken(googleToken);

            response.status(200).send(result);
        } catch(error: any) {
            next(error)
        }
    }
}
