import axios from "axios";
import { IsNull } from "typeorm";
import { Statistics } from "../database/model/Statistics";
import HttpError from "../exceptions/HttpError";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import IJdoodleResponseCodeProperties from "../interfaceType/IJdoodleResponseCodeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import ILevelRepository from "../repository/interface/ILevelRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LanguageCodeDictionary from "../utils/LanguageCodeDictionary";
import JDoodleService from "./JDoodleService";

export default class ExerciseService{
    private exerciseRepository: IExerciseRepository;
    private statisticsRepository: IStatisticsRepository;
    private challangeRepository: IChallengeRepository;
    private levelRepository: ILevelRepository;
    private userRepository: IUserRepository;
    private jdoodleService: JDoodleService;

    constructor(exerciseRepository:IExerciseRepository, 
                statisticsRepository: IStatisticsRepository, 
                userRepository: IUserRepository, 
                levelRepository: ILevelRepository,
                challangeRepository: IChallengeRepository
    ){
        this.exerciseRepository = exerciseRepository;
        this.statisticsRepository = statisticsRepository;
        this.challangeRepository = challangeRepository;
        this.levelRepository = levelRepository;
        this.userRepository = userRepository;
        this.jdoodleService = new JDoodleService();
    }

    createExercise = async (exercise: IExerciseProperties) =>{
        return await this.exerciseRepository.save(exercise);
    }

    findExerciseById = async (exerciseID: number) => {
        const exerciseExists = await this.exerciseRepository.findExerciseById(exerciseID);

        if(!exerciseExists) {
            throw new HttpError('Exercise not found!', 404);
        }

        return exerciseExists;
    }

    sendExerciseCode = async (userID: number, exerciseID: number, userCode: string, language: string) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError('User not found!', 404);
        }

        const [challengeExists] = await this.challangeRepository.findChallengesByExercisesIds([exerciseID]);

        if(!challengeExists) {
            throw new HttpError('Challenge not found!', 404);
        }

        let userResponse = await this.jdoodleService.sendCode(userCode, language);

        if(challengeExists.exercises[0].expectedOutput === userResponse.output) {
            userResponse = {
                ...userResponse,
                isCorrect: true
            }
        } else {
            userResponse = {
                ...userResponse,
                isCorrect: false,
                message: "Incorrect code or incorrect output format"
            }
        }

        return userResponse;
    }
    
    findExercisesByIds = async (exercisesID: number[]) => {
        return await this.exerciseRepository.findExercisesByIds(exercisesID);
    }

    randomizeExercisesIDs = async () => {
        return await this.exerciseRepository.randomizeExercisesIDs();
    }
}