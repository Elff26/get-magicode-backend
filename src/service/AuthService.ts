import HttpError from "../exceptions/HttpError";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import Crypt from "../utils/Crypt";
import jwt from "jsonwebtoken";

export default class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    login = async (user: ILoginProperties) => {
        const userExists = await this.userRepository.findUserWithPasswordByEmail(user.email);

        if(!userExists || !userExists.userID) {
            throw new HttpError('Invalid email or password!', 400);
        }

        let passwordEquals = await Crypt.decrypt(user.password, userExists.password);
        
        if(!passwordEquals) {
            throw new HttpError('Invalid email or password!', 400);
        }

        const userToReturn = await this.userRepository.findUserById(userExists.userID);

        var token = jwt.sign({user: userExists.userID}, process.env.TOKEN_SECRET ,{expiresIn: '1h'}); 
         console.log("Token",token);

        return {user: userToReturn, token};
    }

    changePassword = async (userID: number, password: string, newPassword: string) => {
        const userExists = await this.userRepository.findUserByIdAndPassword(userID, password);

        if(!userExists) {
            throw new HttpError('Invalid password!', 400);
        }

        userExists.password = newPassword;

        return this.userRepository.updateUser(userExists);
    }
}