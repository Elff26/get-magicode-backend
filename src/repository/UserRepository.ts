import { Repository } from "typeorm";
import { User } from "../database/model/User";
import IUserRepository from "./interface/IUserRepository";
import { AppDataSource } from "../../data-source";

export default class UserRepository implements IUserRepository{
    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = AppDataSource.manager.getRepository(User);
    }

    save = async (user: User) => {
        return await this.userRepository.save(user);
    }
    
    createUser = async (user: User) =>{
        return await this.userRepository.save(user);
    }
    
    findUserById = async (userID: number) => {
        return await this.userRepository.findOneBy({
            userID: userID
        });
    }

    findUserByEmail = async (email: string) => {
        return await this.userRepository.createQueryBuilder('User')
            .where({
                email
            })
            .getOne();
    }

    findUserWithPasswordByEmail = async (email: string) => {
        return await this.userRepository.createQueryBuilder('User')
            .select(['User', 'User.password'])
            .where({
                email
            })
            .getOne();
    }

    findUserWithPasswordById = async (userID: number) => {
        return await this.userRepository.createQueryBuilder('User')
            .select(['User', 'User.password'])
            .where({
                userID
            })
            .getOne();
    }


    findUserWithRefreshTokenById = async (userID: number) => {
        return await this.userRepository.createQueryBuilder('User')
            .select(['User', 'User.externalToken'])
            .where({
                userID
            })
            .getOne();
    }
    
    findUserByEmailOrPhone = async (email: string, phone: string) => {
        return await this.userRepository.createQueryBuilder('User')
            .where({
                email
            })
            .orWhere({
                phone
            })
            .getOne();
    }

    findUserByExternalID = async (externalID: string) => {
        return await this.userRepository.findOne({
                where: {
                    externalID: externalID
                }
            })
    }
    
    updateUser = async (user: User) => {
        return await this.userRepository.save(user);
    }
    
    deleteUser = async (userID: number) => {
        return await this.userRepository.delete({
            userID,
        });
    }
    
    findUserByEmailAndPassword = async (email: string, password: string) => {
        return await this.userRepository.findOneBy({
            email,
            password
        });
    }

    findUserByIdAndPassword = async (userID: number, password: string) => {
        return await this.userRepository.createQueryBuilder('User')
        .where({
            userID
        })
        .andWhere({
            password
        })
        .getOne();
    }
    

    insertCodeAndDatePasswordbyUser = async(code: string, date: string, email: string) =>{
        return await this.userRepository.createQueryBuilder()
                                        .update('User')
                                        .set({codeChangePassword:code, expirationDate: date})
                                        .where({email})
                                        .execute();
    }

    verificationResetPassword = async (userID: number, passwordReset: string) =>{
        return await this.userRepository.createQueryBuilder()
                                        .update('User')
                                        .set({password:passwordReset})
                                        .where({userID})
                                        .execute();
    }

    getImageByUser = async (userID:number) => {
        return await this.userRepository.createQueryBuilder('User')
                                        .select(['User.image'])
                                        .where({
                                            userID
                                        })
                                        .getOne();
    }
}
