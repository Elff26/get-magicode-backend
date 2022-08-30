import HttpError from "../exceptions/HttpError";
import IUserProperties from "../interfaceType/IUserProperties";
import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = async (user: UserModel) => {
        const userExists = await this.userRepository.findUserByEmailOrPhone(user.email, user.phone);

        if(userExists) {
            throw new HttpError('This email/phone already exists!', 409)
        }

        return await this.userRepository.createUser(user);
    }

    findUserById = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        return userExists;
    }

    updateUser = async (userID: number, user: UserModel) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        } 

        user.userID = userExists.userID;
        user.password = user.password;

        return this.userRepository.updateUser(user);
    }
    
    deleteUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        return await this.userRepository.deleteUser(userID);
    }
}