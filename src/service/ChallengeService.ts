import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import IUserChallengeProperties from "../interfaceType/IUserChallengeProperties";
import UserChallengeModel from "../model/UserChallengeModel";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserChallengeRepository from "../repository/interface/IUserChallengeRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class ChallengeService {
    private challengeRepository: IChallengeRepository;
    private technologyRepository: ITechnologyRepository;
    private userChallengeRepository: IUserChallengeRepository;
    private userRepository: IUserRepository;

    constructor(
        challengeRepository: IChallengeRepository, 
        technologyRepository: ITechnologyRepository, 
        userChallengeRepository: IUserChallengeRepository,
        userRepository: IUserRepository
    ) {
        this.challengeRepository = challengeRepository;
        this.technologyRepository = technologyRepository;
        this.userChallengeRepository = userChallengeRepository;
        this.userRepository = userRepository;
    }

    createChallenge = async (challenge: IChallengeProperties) => {
        return await this.challengeRepository.save(challenge);
    }

    findChallengeByID = async (challengeID: number) => {
        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if (!challengeExists) {
            throw new HttpError('Challenge Not Found!', 404);
        }

        return challengeExists;
    }

    findChallengeByTechnology = async (technologyID: number) => {
        const technologyExists = await this.technologyRepository.findByID(technologyID);

        if(!technologyExists) {
            throw new HttpError('Technology Not Found!', 404);
        }

        const challenges = await this.challengeRepository.findChallengeByTechnology(technologyExists.technologyID);

        if(!challenges) {
            throw new HttpError('This technology has no challenges!', 404);
        }

        return challenges;
    }

    findUserChallengeByTechnology = async (userID: number, technologyID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const technologyExists = await this.technologyRepository.findByID(technologyID);

        if(!technologyExists) {
            throw new HttpError('Challenge not found!', 404);
        }

        const result = await this.userChallengeRepository.findUserChallengeByTechnology(userExists.userID, technologyExists.technologyID);

        if(!result) {
            throw new HttpError('This user has no challenges with this technology', 404);
        }

        return result;
    }

    initChallenge = async (challengeID: number, userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError('Challenge not found!', 404);
        }

        const userChallengeExists = await this.userChallengeRepository.findByUserChallengeByUserAndChallenge(userExists.userID, challengeExists.challengeID);

        if(!userChallengeExists) {
            const userChallenge: IUserChallengeProperties = {
                user: userExists,
                challenge: challengeExists,
                completed: false
            }
    
            const result = await this.userChallengeRepository.saveOrUpdate(userChallenge);
    
            if(!result) {
                throw new HttpError('Error when trying associate user with challenge. Try again later!', 400);
            }

            return result;
        }
        
        return userChallengeExists;
    }

    finishChallenge = async (challengeID: number, userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError('Challenge not found!', 404);
        }

        const userChallengeExists = await this.userChallengeRepository.findByUserChallengeByUserAndChallenge(userExists.userID, challengeExists.challengeID); 

        if(!userChallengeExists) {
            throw new HttpError('This user has no association with this challenge!', 400);
        }

        userChallengeExists.completed = true;

        return await this.userChallengeRepository.saveOrUpdate(userChallengeExists);
    }
}