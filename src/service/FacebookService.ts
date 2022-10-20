import axios from "axios";
import HttpError from "../exceptions/HttpError";
import IFAcebookInspectTokenProperties from "../interfaceType/IFAcebookInspectTokenProperties";
import IFacebookTokensProperties from "../interfaceType/IFacebookTokensProperties";
import IFacebookUserDataProperties from "../interfaceType/IFacebookUserDataProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import StatisticsService from "./StatisticsService";

export default class FacebookService {
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

    siginWithFacebook = async (facebookCode: string) => {
        let tokens: IFacebookTokensProperties = await this.getUserFacebookTokens(facebookCode);
        let facebookTokensIdentity = await this.checkFacebookTokensIdentity();
        let inspectUserToken: IFAcebookInspectTokenProperties = await this.inspectUserToken(tokens.access_token, facebookTokensIdentity.access_token);
        let facebookUserInfo: IFacebookUserDataProperties = await this.getFacebookUserInfo(tokens.access_token);
    
        let userExists: IUserProperties | null = await this.userRepository.findUserByExternalID(facebookUserInfo.id);
        
        if(!userExists) {
            const newUser: IUserProperties = {
                name: facebookUserInfo.name,
                email: facebookUserInfo.email,
                password: "",
                numberOfLifes: 5,
                externalID: facebookUserInfo.id,
                externalToken: tokens.access_token
            }

            userExists = newUser
        }

        userExists.externalToken = tokens.access_token;

        let savedUser = await this.userRepository.save(userExists);

        if(!savedUser || !savedUser.userID) {
            throw new HttpError("Error when trying to create user. Try again later!", 500);
        }

        if(!savedUser.statistics) {
            savedUser = await this.statisticsService.createUserStatistics(savedUser.userID);
        }

        return {
            user: savedUser,
            token: tokens.access_token
        };
    }

    getUserFacebookTokens = async (facebookCode: string) => {
        let resultTokens: IFacebookTokensProperties = (await axios.get(`https://graph.facebook.com/v15.0/oauth/access_token?` + 
                                            `client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}` + 
                                            `&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${facebookCode}`)).data;

        if(resultTokens.error) {
            throw new HttpError("Error when trying to connect to Facebook!", 400);
        }

        return resultTokens;
    }

    checkFacebookTokensIdentity = async () => {
        const appToken = (await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`)).data;
    
        if(appToken.error) {
            throw new HttpError("Error when trying to connect to Facebook!", 400);
        }

        return appToken;
    }

    inspectUserToken = async (accessToken: string, appAccessToken: string) => {
        const inspectToken: IFAcebookInspectTokenProperties = (await axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`)).data;
    
        if(inspectToken.data.error || !inspectToken.data.is_valid) {
            return this.externalAuthLogout();
        }

        return inspectToken;
    }

    getFacebookUserInfo = async (accessToken: string) => {
        const userData: IFacebookUserDataProperties = (await axios.get(`https://graph.facebook.com/me?fields=email,name,picture&access_token=${accessToken}`)).data;

        if(userData.error) {
            return this.externalAuthLogout();
        }

        return userData;
    }

    checkFacebookToken = async (accessToken: string) => {
        await this.getFacebookUserInfo(accessToken);

        return true;
    }

    externalAuthLogout = async () => {
        throw new HttpError("You need to refresh token!", 401);
    }
}