import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = (user:UserModel) => {
        console.log(user)
        return this.userRepository.createUser(user);
    }
}