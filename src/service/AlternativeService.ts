import HttpError from "../exceptions/HttpError";
import IAlternativeProperties from "../interfaceType/IAlternativeProperties";
import IAlternativeRepository from "../repository/interface/IAlternativeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import Messages from "../utils/Messages";

export default class AlternativeService {
    private alternativeRepository: IAlternativeRepository;
    private exerciseRepository: IExerciseRepository;

    constructor(alternativeRepository: IAlternativeRepository, exerciseRepository: IExerciseRepository) {
        this.alternativeRepository = alternativeRepository;
        this.exerciseRepository = exerciseRepository;
    }

    createAlternative = async (alternative: IAlternativeProperties) => {
        return await this.alternativeRepository.save(alternative);
    }

    findAlternativeByID = async (alternativeID: number) => {
        const alternativeExists = await this.alternativeRepository.findAlternativeByID(alternativeID);

        if(!alternativeExists) {
            throw new HttpError(Messages.ALTERNATIVE_NOT_FOUND, 404);
        }

        return alternativeExists;
    }

    findAlternativeByExercise = async (exerciseID: number) => {
        const exerciseExists = await this.exerciseRepository.findExerciseById(exerciseID);

        if(!exerciseExists) {
            throw new HttpError(Messages.EXERCISE_NOT_FOUND, 404);
        }

        const alternatives = await this.alternativeRepository.findAlternativeByExercise(exerciseExists.exerciseID);

        return alternatives;
    }

    alternativeIsCorrect = async (alternativeID: number) => {
        const alternativeExists = await this.alternativeRepository.findAlternativeByID(alternativeID);

        if(!alternativeExists) {
            throw new HttpError(Messages.ALTERNATIVE_NOT_FOUND, 404);
        }

        return alternativeExists.isCorrect;
    }
}