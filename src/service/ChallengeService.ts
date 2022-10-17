import { Statistics } from "../database/model/Statistics";
import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import IUserChallengeProperties from "../interfaceType/IUserChallengeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserChallengeRepository from "../repository/interface/IUserChallengeRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class ChallengeService {
    private challengeRepository: IChallengeRepository;
    private technologyRepository: ITechnologyRepository;
    private userChallengeRepository: IUserChallengeRepository;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;

    constructor(
        challengeRepository: IChallengeRepository, 
        technologyRepository: ITechnologyRepository, 
        userChallengeRepository: IUserChallengeRepository,
        statisticsRepository: IStatisticsRepository,
        levelRepository: ILevelRepository,
        userRepository: IUserRepository
    ) {
        this.challengeRepository = challengeRepository;
        this.technologyRepository = technologyRepository;
        this.userChallengeRepository = userChallengeRepository;
        this.statisticsRepository = statisticsRepository;
        this.levelRepository = levelRepository;
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

        if(!userExists || !userExists.userID) {
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

        if(!userExists || !userExists.userID) {
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
        
        if(!userExists || !userExists.userID) {
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

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);
        const level = await this.levelRepository.findFirstLevel();

        if(!level) {
            throw new HttpError('There is no level!', 404);
        }

        if(!statisticsExists) {
            let statistics = new Statistics();
            statistics.level = level;
            statistics.user = userExists;

            statisticsExists = await this.statisticsRepository.saveOrUpdate(statistics);
        }

        statisticsExists.completedClasses += 1;
        userChallengeExists.completed = true;

        await this.statisticsRepository.saveOrUpdate(statisticsExists);
        return await this.userChallengeRepository.saveOrUpdate(userChallengeExists);
    }

    findChallengesByExercisesIds = async (exerciseIDs: number[]) => {
        return await this.challengeRepository.findChallengesByExercisesIds(exerciseIDs);
    }
}