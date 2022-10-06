import HttpError from "../exceptions/HttpError";
import ILoginProperties from "../interfaceType/ILoginProperties";
import IUserRepository from "../repository/interface/IUserRepository";

export default class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    login = async (user: ILoginProperties) => {
        const userExists = await this.userRepository.findUserByEmailAndPassword(user.email, user.password);

        if(!userExists) {
            throw new HttpError('Invalid email or password!', 400);
        }

        return userExists;
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