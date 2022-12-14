import { Statistics } from "../database/model/Statistics";
import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import IUserChallengeProperties from "../interfaceType/IUserChallengeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IDifficultRepository from "../repository/interface/IDifficultyRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserChallengeRepository from "../repository/interface/IUserChallengeRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import Messages from "../utils/Messages";

export default class ChallengeService {
    private challengeRepository: IChallengeRepository;
    private technologyRepository: ITechnologyRepository;
    private difficultyRepository: IDifficultRepository;
    private userChallengeRepository: IUserChallengeRepository;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;

    constructor(
        challengeRepository: IChallengeRepository, 
        technologyRepository: ITechnologyRepository, 
        difficultyRepository: IDifficultRepository, 
        userChallengeRepository: IUserChallengeRepository,
        statisticsRepository: IStatisticsRepository,
        levelRepository: ILevelRepository,
        userRepository: IUserRepository
    ) {
        this.challengeRepository = challengeRepository;
        this.technologyRepository = technologyRepository;
        this.difficultyRepository = difficultyRepository;
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
            throw new HttpError(Messages.CHALLENGE_NOT_FOUND, 404);
        }

        return challengeExists;
    }

    findChallengeByTechnologyAndDifficulty = async (technologyID: number, difficultyID: number) => {
        const technologyExists = await this.technologyRepository.findByID(technologyID);

        if(!technologyExists) {
            throw new HttpError(Messages.TECHNOLOGY_NOT_FOUND, 404);
        }

        const difficultyExists = await this.difficultyRepository.findDifficultyById(difficultyID);

        if(!difficultyExists) {
            throw new HttpError(Messages.DIFFICULTY_NOT_FOUND, 404);
        }

        const challenges = await this.challengeRepository.findChallengeByTechnologyAndDifficulty(technologyExists.technologyID, difficultyExists.difficultyID);

        if(!challenges) {
            throw new HttpError(Messages.TECHNOLOGY_HAS_NO_CHALLENGES, 404);
        }

        return challenges;
    }

    findUserChallengeByTechnologyAndDifficulty = async (userID: number, technologyID: number, difficultyID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const technologyExists = await this.technologyRepository.findByID(technologyID);

        if(!technologyExists) {
            throw new HttpError(Messages.TECHNOLOGY_NOT_FOUND, 404);
        }

        const difficultyExists = await this.difficultyRepository.findDifficultyById(difficultyID);

        if(!difficultyExists) {
            throw new HttpError(Messages.DIFFICULTY_NOT_FOUND, 404);
        }

        const result = await this.userChallengeRepository.findUserChallengeByTechnologyAndDifficulty(userExists.userID, technologyExists.technologyID, difficultyExists.difficultyID);

        if(!result) {
            throw new HttpError(Messages.USER_TECHNOLOGY_HAS_NO_CHALLENGES, 404);
        }

        return result;
    }

    initChallenge = async (challengeID: number, userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError(Messages.CHALLENGE_NOT_FOUND, 404);
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
                throw new HttpError(Messages.ASSOCIATE_USER_CHALLENGE, 400);
            }

            return result;
        }
        
        return userChallengeExists;
    }

    finishChallenge = async (challengeID: number, userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError(Messages.CHALLENGE_NOT_FOUND, 404);
        }

        const userChallengeExists = await this.userChallengeRepository.findByUserChallengeByUserAndChallenge(userExists.userID, challengeExists.challengeID); 

        if(!userChallengeExists) {
            throw new HttpError(Messages.USER_CHALLENGE_ASSOCIATION, 400);
        }

        let statisticsExists = await this.statisticsRepository.findStatisticsByUser(userExists.userID);

        if(!statisticsExists) {
            const level = await this.levelRepository.findFirstLevel();

            if(!level) {
                throw new HttpError(Messages.LEVEL_NOT_FOUND, 404);
            }

            let statistics = new Statistics();
            statistics.initStatistics(level);
        }

        if(!userChallengeExists.completed) {
            statisticsExists.completedClasses += 1;
        }

        userChallengeExists.completed = true;

        await this.statisticsRepository.saveOrUpdate(statisticsExists);
        return await this.userChallengeRepository.saveOrUpdate(userChallengeExists);
    }

    findChallengesByExercisesIds = async (exerciseIDs: number[]) => {
        return await this.challengeRepository.findChallengesByExercisesIds(exerciseIDs);
    }
}