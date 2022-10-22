import axios from "axios";
import HttpError from "../exceptions/HttpError";
import IGoogleCustomDataProperties from "../interfaceType/IGoogleCustomDataProperties";
import IGoogleMoreInfoUserDataProperties from "../interfaceType/IGoogleMoreInfoUserDataProperties";
import IGoogleTokensProperties from "../interfaceType/IGoogleTokensProperties";
import IGoogleUserDataProperties from "../interfaceType/IGoogleUserDataProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import StatisticsService from "./StatisticsService";

export default class GoogleService {
    private userRepository: IUserRepository;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private statisticsService: StatisticsService;

    constructor(userRepository: IUserRepository, statisticsRepository: IStatisticsRepository, levelRepository: ILevelRepository){
        this.userRepository = userRepository;
        this.statisticsRepository = statisticsRepository;
        this.levelRepository = levelRepository;
        this.statisticsService = new StatisticsService(this.statisticsRepository, this.userRepository, this.levelRepository);
    }

    siginWithGoogle = async (googleCode: string) => {
        let tokens: IGoogleTokensProperties = await this.getUserGoogleTokens(googleCode);
        let userData: IGoogleUserDataProperties = await this.getGoogleUserInfo(tokens.access_token);
        let userExists: IUserProperties | null = await this.userRepository.findUserByExternalID(userData.id);
            
        if(!userExists) {
            let userGetCustomFields: IGoogleCustomDataProperties = await this.getCustomGoogleFields(tokens.access_token);

            const newUser: IUserProperties = {
                name: userData.name,
                email: userData.email,
                password: "",
                birthday: userGetCustomFields.birthday,
                numberOfLifes: 5,
                externalID: userData.id,
                externalToken: tokens.refresh_token
            }

            if(userGetCustomFields.phoneNumber) {
                newUser.phone = userGetCustomFields.phoneNumber;
            }

            userExists = newUser;
        }
            
        userExists.externalToken = tokens.refresh_token;

        const savedUser = await this.userRepository.save(userExists);

        if(!savedUser || !savedUser.userID) {
            throw new HttpError("Error when trying to create user. Try again later!", 500);
        }

        const userWithStatistics = await this.statisticsService.createUserStatistics(savedUser.userID);

        return {
            user: userWithStatistics,
            token: tokens.access_token
        };
    }

    getUserGoogleTokens = async (googleCode: string) => {
        try {
            let resultTokens = await axios.post(`https://oauth2.googleapis.com/token`, {
                client_id: process.env.GOOGLE_CLIENT_ID,
                redirect_uri: process.env.REDIRECT_URI,
                code: googleCode,
                grant_type: "authorization_code",
                client_secret: process.env.GOOGLE_CLIENT_SECRET
            });

            if(!resultTokens.data.access_token) {
                throw new HttpError("Error when trying to connect to Google!", 400);
            }

            return resultTokens.data;
        } catch(error: any) {
            return this.externalAuthLogout();
        }        
    }

    getGoogleUserInfo = async (accessToken: string) => {
        try {
            const userData = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });

            return userData.data;
        } catch(error: any) {
            return this.externalAuthLogout();
        }
    }

    getCustomGoogleFields = async (accessToken: string) => {
        let birthday, phoneNumber: string | null = null;

        try {
            const moreInfoUserData: IGoogleMoreInfoUserDataProperties = (await axios.get(`https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })).data;
        
            if(moreInfoUserData.birthdays) {
                let birthDate = moreInfoUserData.birthdays[0].date;
        
                birthday = new Date(Number(birthDate.year), Number(birthDate.month) - 1, Number(birthDate.day));
            }
    
            if(moreInfoUserData.phoneNumbers) {
                phoneNumber = moreInfoUserData.phoneNumbers[0].value;
            }

            return {
                birthday: birthday?.toString(),
                phoneNumber: phoneNumber
            }
        } catch(error: any) {
            return this.externalAuthLogout();
        }
    }

    checkGoogleToken = async (accessToken: string, userID: number) => {
        let result = await this.checkIfCanGetUserInfo(accessToken, userID);

        if(!result) {
            return false;
        }

        return result;
    }

    checkIfCanGetUserInfo = async (accessToken: string, userID: number) => {
        try {
            const userData = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });

            return userData.data;
        } catch(error: any) {
            if(error.response.data.error.status === 'UNAUTHENTICATED') {
                return this.refreshGoogleToken(userID);
            }

            return this.externalAuthLogout();
        }
    }

    refreshGoogleToken = async (userID: number) => {
        let userExists = await this.userRepository.findUserWithRefreshTokenById(userID);

        if(!userExists) {
            throw new HttpError("User not found!", 404);
        }

        try {
            let result = (await axios.post(`https://oauth2.googleapis.com/token?` +
                                                    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
                                                    `refresh_token=${userExists.externalToken}&` +
                                                    `grant_type=refresh_token&` +
                                                    `client_secret=${process.env.GOOGLE_CLIENT_SECRET}`))
                                                    .data;

            userExists.externalToken = result.access_token;

            return {
                accessToken: result.access_token
            };
        } catch(error: any) {
            throw new HttpError("Error on refresh token, please try again later!", 401);
        }
    }

    externalAuthLogout = async () => {
        throw new HttpError("You need to refresh token!", 401);
    }
}