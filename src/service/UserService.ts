import UserModel from "../model/UserModel";
import IUserRepository from "../repository/interface/IUserRepository";

export default class UserService{
    private userRepository: IUserRepository;

    constructor(){
        this.userRepository = new IUserRepository();
    }

    createUser = (user:UserModel) => {
        console.log(user)
        return this.userRepository.createUser(user);
    }
}