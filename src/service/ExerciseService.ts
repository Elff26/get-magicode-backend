import HttpError from "../exceptions/HttpError";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import IUserCodeReturn from "../interfaceType/IUserCodeReturn";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import JDoodleService from "./JDoodleService";
import validJson from '../utils/ValidJson';

export default class ExerciseService{
    private exerciseRepository: IExerciseRepository;
    private challangeRepository: IChallengeRepository;
    private userRepository: IUserRepository;
    private jdoodleService: JDoodleService;

    constructor(exerciseRepository:IExerciseRepository, 
                userRepository: IUserRepository, 
                challangeRepository: IChallengeRepository
    ){
        this.exerciseRepository = exerciseRepository;
        this.challangeRepository = challangeRepository;
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

        let inputs:string[] = JSON.parse(challengeExists.exercises[0].description).input;

        if(!inputs)
           inputs = [""];

        var min = 0, isCorrect = 0;
        var userResponseToReturn: IUserCodeReturn = {
            isCorrect: false,
            jdoodleResponse: []
        }; 

        let outputs: string[] | number[];

        if(validJson(challengeExists.exercises[0].expectedOutput)) {
            outputs = JSON.parse(challengeExists.exercises[0].expectedOutput);
        } else {
            outputs = [challengeExists.exercises[0].expectedOutput];
        }

        do {
            let userResponse = await this.jdoodleService.sendCode(userCode, language, inputs[min]);
           
            if(outputs[min].toString() === userResponse.output) {
                userResponseToReturn.jdoodleResponse.push({
                    ...userResponse,
                    isCorrect: true
                });

                isCorrect++;
            } else {
                userResponseToReturn.jdoodleResponse.push({
                    ...userResponse,
                    isCorrect: false,
                    message: "Incorrect code or incorrect output format"
                })
            }

            min++;
        } while(min < inputs.length);

        userResponseToReturn.isCorrect = isCorrect === outputs.length

        return userResponseToReturn;
    }
    
    findExercisesByIds = async (exercisesID: number[]) => {
        return await this.exerciseRepository.findExercisesByIds(exercisesID);
    }

    randomizeExercisesIDs = async (technologyID: number) => {
        return await this.exerciseRepository.randomizeExercisesIDs(technologyID);
    }
}