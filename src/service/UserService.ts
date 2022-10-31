import { User } from "../database/model/User";
import HttpError from "../exceptions/HttpError";
import IUserMoreDataInterface from "../interfaceType/IUserMoreDataProperties";
import IUserRepository from "../repository/interface/IUserRepository";
import CodeAndDataGenerator from "../utils/CodeAndDateGenerator";
import Crypt from "../utils/Crypt";
import DateUtils from "../utils/DateUtils";
import SendEmail from "../utils/SendEmail";

export default class UserService{
    private userRepository: IUserRepository;
    private codeAndDataGenerator = new CodeAndDataGenerator();

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    createUser = async (user: User) => {
        const userExists = await this.userRepository.findUserByEmailOrPhone(user.email, user.phone ? user.phone : "");

        if(userExists) {
            throw new HttpError('This email/phone already exists!', 409)
        }

        let encryptedPassword = await Crypt.encrypt(user.password);
        user.password = encryptedPassword;

        return await this.userRepository.createUser(user);
    }

    findUserById = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        return userExists;
    }

    updateUser = async (userID: number, user: User) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        } 

        user.userID = userExists.userID;
        let encryptedPassword = await Crypt.encrypt(user.password);
        user.password = encryptedPassword;

        return this.userRepository.updateUser(user);
    }
    
    deleteUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        return await this.userRepository.deleteUser(userID);
    }

    insertCodeAndDatePasswordbyUser = async (email: string) =>{
        const userExists = await this.userRepository.findUserByEmailOrPhone(email, "");

        const code = this.codeAndDataGenerator.codeGenerator(1, 9999);
        const expirationDate = this.codeAndDataGenerator.datePlusHours(24);
        let expirationDateConverted = new DateUtils().dateConvertToEUA(expirationDate);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }
        const sendEmail = new SendEmail();
        sendEmail.sendEmail(code, expirationDate, email);

        await this.userRepository.insertCodeAndDatePasswordbyUser(code, expirationDateConverted.toString(), email);

        return userExists.userID;
    }

    verificationCode = async (code: string, userID: number) =>{
        const user = await this.userRepository.findUserById(userID);
        const dateCurrent = new Date()

        if(!user || !user.expirationDate) {
            throw new HttpError('User not found!', 404);
        }
        
        const expirationDate = new Date(user.expirationDate); 

        console.log("CODIGOE  DATA", user.expirationDate, user.codeChangePassword, expirationDate.getTime(), dateCurrent.getTime())
        console.log(user.codeChangePassword, code)
        console.log(expirationDate.getTime() > dateCurrent.getTime(), user.codeChangePassword != code)

        if(user.codeChangePassword != code || expirationDate.getTime() <= dateCurrent.getTime()){
            throw new HttpError('Code stay invalid!', 404);
        }
        
        return user;
    }

    decreaseNumberOfLifes = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        const currentDate = new Date()

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        if(userExists.numberOfLifes < 1){
            throw new HttpError('User has no lives', 202)
        }

        userExists.numberOfLifes -= 1;
        userExists.lastUpdateNumberOfLifes =  currentDate;

        return await this.userRepository.updateUser(userExists)
    }

    addUserLife = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        if(userExists.numberOfLifes >= 5){
            throw new HttpError('User owns all lives', 202)
        }

        userExists.numberOfLifes += 1;
        return await this.userRepository.updateUser(userExists)
    }

    getNumberOfLifes = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        return userExists.numberOfLifes;
    }

    addMoreUserInfo = async (userID: number, userData: IUserMoreDataInterface) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }
        
        if(!userExists.phone) {
            userExists.phone = userData.phone;
        }

        if(!userExists.birthday) {
            userExists.birthday = userData.birthday;
        }

        let updatedUser = this.userRepository.save(userExists);
        
        return updatedUser;
    }

    getGoalByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const result = await this.userRepository.getGoalByUser(userID);

        return result;
    }

    saveProfilePicture = async (userID: number, image: string) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        userExists.image = Buffer.from(image, "base64") ;

        const result = await this.userRepository.updateUser(userExists);
        return result;
    }
}