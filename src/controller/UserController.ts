import { NextFunction, Request, Response } from "express";
import { User } from "../database/model/User";
import HttpError from "../exceptions/HttpError";
import IUserMoreDataInterface from "../interfaceType/IUserMoreDataProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import UserService from "../service/UserService";
import Messages from "../utils/Messages";

export default class UserController{
    private userRepository: IUserRepository
    private userService: UserService

    constructor() {
        this.userRepository = new UserRepository();
        this.userService = new UserService(this.userRepository);
    }

    createUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user: IUserProperties = new User(request.body.user);

            if(!user.name || !user.birthday || !user.email || !user.phone || !user.password) {
                throw new HttpError(Messages.ALL_FIELDS_ARE_REQUIRED, 400);
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
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
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
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
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
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }
    
            const result = await this.userService.deleteUser(Number(request.params.userID));
    
            response.json({ message: "Usu??rio deletado com sucesso!" });
        }  catch(error: any) {
            next(error)
        }
    }

    insertCodeAndDatePasswordbyUser = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const email = request.body.email;

            const userID = await this.userService.insertCodeAndDatePasswordbyUser(email);

            response.status(200).json({ message: "Codigo e Data de Expira????o gerados com sucesso!", userID});

        }catch(error: any){
            next(error)
        }
    }

    verificationCode = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const userID = Number(request.params.userID);
            const code = request.body.codeChangePassword;
            
            if(isNaN(userID)){
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.userService.verificationCode(code, userID)

            response.status(200).json({ message: "C??digo verificado com sucesso", token: result });
            
        }catch(error: any){
            next(error)
        }
    }

    decreaseNumberOfLifes = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID)

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
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
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
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
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }
    
            const result = await this.userService.getNumberOfLifes(userID);
    
            response.status(200).json({ numberOfLifes: result });
        }  catch(error: any) {
            next(error)
        }
    }

    addMoreUserInfo = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userID = Number(request.params.userID)
            const userData: IUserMoreDataInterface = request.body.userData;

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }
            
            if(!userData.phone && !userData.birthday) {
                throw new HttpError(Messages.PHONENUMBER_AND_BIRTHDAY_ARE_REQUIRED, 400);
            }

            const result = await this.userService.addMoreUserInfo(userID, userData);
    
            response.status(200).json({ user: result });
        }  catch(error: any) {
            next(error)
        }
    }

    saveProfilePicture = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const userID = Number(request.params.userID);
            const image = request.body.image;

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.userService.saveProfilePicture(userID, image);
    
            response.status(200).json({ user: result });
        }catch(error: any) {
            next(error)
        }
    }

    getProfilePicture = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.userService.getProfilePicture(userID);
    
            response.status(200).json({ user: result });
        }catch(error: any) {
            next(error)
        }
    }
}
