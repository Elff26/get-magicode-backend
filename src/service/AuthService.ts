import HttpError from "../exceptions/HttpError";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import Crypt from "../utils/Crypt";
import jwt from "jsonwebtoken";
import Messages from "../utils/Messages";

export default class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    login = async (user: ILoginProperties) => {
        const userExists = await this.userRepository.findUserWithPasswordByEmail(user.email);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.EMAIL_OR_PASSWORD_INVALID, 400);
        }

        let passwordEquals = await Crypt.decrypt(user.password, userExists.password);
        
        if(!passwordEquals) {
            throw new HttpError(Messages.EMAIL_OR_PASSWORD_INVALID, 400);
        }

        const userToReturn = await this.userRepository.findUserById(userExists.userID);

        var token = jwt.sign({user: userExists.userID}, process.env.TOKEN_SECRET ,{expiresIn: '1h'}); 

        return {user: userToReturn, token};
    }

    changePassword = async (userID: number, password: string, newPassword: string) => {
        const userExists = await this.userRepository.findUserWithPasswordById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 400);
        }

        let passwordEquals = await Crypt.decrypt(password, userExists.password);

        if(!passwordEquals) {
            throw new HttpError(Messages.INVALID_PASSWORD, 400);
        }

        let encryptedPassword = await Crypt.encrypt(newPassword);
        userExists.password = encryptedPassword;

        return this.userRepository.updateUser(userExists);
    }
}