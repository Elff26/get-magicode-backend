import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = (user:UserModel) => {
        return this.userRepository.createUser(user);
    }

    findUserById = async (cdUsuario:number) => {
        return await this.userRepository.findUserById(cdUsuario);
    }

    updateUser = async (cdUsuario: number, user: UserModel) => {
        const userExists = await this.userRepository.findUserById(cdUsuario);

        if(!userExists) {
            throw new Error("User already exists!");
        }

        return this.userRepository.updateUser(user);
    }   
}