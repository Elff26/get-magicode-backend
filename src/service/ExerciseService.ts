import axios from "axios";
import HttpError from "../exceptions/HttpError";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import IJdoodleResponseCodeProperties from "../interfaceType/IJdoodleResponseCodeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import IStatisticsRepository from "../repository/interface/IStatisticsRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import LanguageCodeDictionary from "../utils/LanguageCodeDictionary";

export default class ExerciseService{
    private exerciseRepository: IExerciseRepository;
    private statisticsRepository: IStatisticsRepository;
    private challangeRepository: IChallengeRepository;
    private userRepository: IUserRepository;

    constructor(exerciseRepository:IExerciseRepository, statisticsRepository: IStatisticsRepository, userRepository: IUserRepository, challangeRepository: IChallengeRepository){
        this.exerciseRepository = exerciseRepository;
        this.statisticsRepository = statisticsRepository;
        this.challangeRepository = challangeRepository;
        this.userRepository = userRepository;
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

    sendExerciseCode = async (userID: number, challengeID: number, exerciseID: number, userCode: string, language: string) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        const challengeExists = await this.challangeRepository.findChallengeByID(challengeID);

        if(!challengeExists) {
            throw new HttpError('Challenge not found!', 404);
        }

        const exerciseExists = await this.exerciseRepository.findExerciseById(exerciseID);

        if(!exerciseExists) {
            throw new HttpError('Exercise not found!', 404);
        }

        let response = await axios.post(`https://api.jdoodle.com/v1/execute`, {
            script : userCode,
            language: LanguageCodeDictionary[language],
            versionIndex: "0",
            clientId: process.env.CLIENTE_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
        
        let responseData: IJdoodleResponseCodeProperties = response.data;

        if(!responseData) {
            throw new HttpError('An error has occurred, please try again later.', 500);
        }

        let userResponse = {
            ...responseData
        };

        if(exerciseExists.expectedOutput === responseData.output) {
            let userStatistics = await this.statisticsRepository.findStatisticsByUser(userExists.userID);
           
            if(!userStatistics) {
                throw new HttpError('An error has occurred, please try again later.', 500);
            }

            userStatistics.addExperienceToUser(challengeExists.difficulty.valueXP);

            await this.statisticsRepository.saveOrUpdate(userStatistics);

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
}