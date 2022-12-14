import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import ChallengeRepository from "../repository/ChallengeRepository";
import DifficultyRepository from "../repository/DifficultyRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IDifficultRepository from "../repository/interface/IDifficultyRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserChallengeRepository from "../repository/interface/IUserChallengeRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LevelRepository from "../repository/LevelRepository";
import StatisticsRepository from "../repository/StatisticsRepository";
import TechnologyRepository from "../repository/TechnologieRepository";
import UserChallengeRepository from "../repository/UserChallengeRepository";
import UserRepository from "../repository/UserRepository";
import ChallengeService from "../service/ChallengeService";
import Messages from "../utils/Messages";

export default class ChallengeController {
    private challengeRepository: IChallengeRepository;
    private technologyRepository: ITechnologyRepository;
    private difficultyRepository: IDifficultRepository;
    private userRepository: IUserRepository;
    private userChallengeRepository: IUserChallengeRepository;
    private statisticsRepository: IStatisticsRepository;
    private levelRepository: ILevelRepository;
    private challengeService: ChallengeService;

    constructor(){
        this.challengeRepository = new ChallengeRepository();
        this.technologyRepository = new TechnologyRepository();
        this.difficultyRepository = new DifficultyRepository();
        this.userRepository = new UserRepository();
        this.statisticsRepository = new StatisticsRepository();
        this.userChallengeRepository = new UserChallengeRepository();
        this.levelRepository = new LevelRepository();
        this.challengeService = new ChallengeService(
                                                    this.challengeRepository, 
                                                    this.technologyRepository, 
                                                    this.difficultyRepository,
                                                    this.userChallengeRepository,
                                                    this.statisticsRepository,
                                                    this.levelRepository,
                                                    this.userRepository
                                                    );
    }

    createChallenge = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challenge: IChallengeProperties = request.body.challenge;
            const result = await this.challengeService.createChallenge(challenge);
            
            response.status(200).json({challenge: result});
        }catch(error: any){
            next(error);
        }
    }

    findChallengeByID = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challengeID = Number(request.params.challengeID);
            if (isNaN(challengeID)){
                throw new HttpError(Messages.CHALLENGE_ID_INCORRECT_TYPE, 403);
            }
            const result = await this.challengeService.findChallengeByID(Number(request.params.challengeID));

            response.status(200).json({challenge: result});
        }catch(error: any){
            next(error);
        }
    }

    findChallengeByTechnologyAndDifficulty = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const technologyID = Number(request.params.technologyID);
            const difficultyID = Number(request.params.difficultyID);

            if (isNaN(technologyID)){
                throw new HttpError(Messages.TECHNOLOGY_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(difficultyID)){
                throw new HttpError(Messages.DIFFICULTY_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.challengeService.findChallengeByTechnologyAndDifficulty(technologyID, difficultyID);

            response.status(200).json({challenges: result});
        }catch(error: any){
            next(error);
        }
    }

    findUserChallengeByTechnologyAndDifficulty = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const technologyID = Number(request.params.technologyID);
            const userID = Number(request.params.userID);
            const difficultyID = Number(request.params.difficultyID);

            if (isNaN(technologyID)){
                throw new HttpError(Messages.TECHNOLOGY_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(userID)){
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(difficultyID)){
                throw new HttpError(Messages.DIFFICULTY_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.challengeService.findUserChallengeByTechnologyAndDifficulty(userID, technologyID, difficultyID);

            response.status(200).json({userChallenges: result});
        }catch(error: any){
            next(error);
        }
    }

    initChallenge = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challengeID = Number(request.params.challengeID);
            const userID = Number(request.params.userID);

            if (isNaN(challengeID)){
                throw new HttpError(Messages.CHALLENGE_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(userID)){
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.challengeService.initChallenge(challengeID, userID);

            response.status(200).json({userChallenge: result});
        }catch(error: any){
            next(error);
        }
    }

    finishChllenge = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challengeID = Number(request.params.challengeID);
            const userID = Number(request.params.userID);

            if (isNaN(challengeID)){
                throw new HttpError(Messages.CHALLENGE_ID_INCORRECT_TYPE, 403);
            }

            if (isNaN(userID)){
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            const result = await this.challengeService.finishChallenge(challengeID, userID);

            response.status(200).json({userChallenge: result});
        }catch(error: any){
            next(error);
        }
    }

    findChallengesByExercisesIds = async (request: Request, response: Response, next: NextFunction) => {
        try {   
            const exercises = request.body.exercises;

            if(!exercises) {
                throw new HttpError(Messages.EXERCISES_IDS_REQUIRED, 403);
            }

            if(exercises.length <= 0) {
                throw new HttpError(Messages.EXERCISES_IDS_REQUIRED, 403);
            }

            const result = await this.challengeService.findChallengesByExercisesIds(exercises);
    
            response.status(200).json(result);
        }  catch(error: any) {
            next(error)
        }
    }
}