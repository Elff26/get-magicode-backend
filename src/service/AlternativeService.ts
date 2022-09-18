import HttpError from "../exceptions/HttpError";
import IAlternativeProperties from "../interfaceType/IAlternativeProperties";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import IAlternativeRepository from "../repository/interface/IAlternativeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";

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
            throw new HttpError("Alternative not found!", 404);
        }

        return alternativeExists;
    }

    findAlternativeByExercise = async (exerciseID: number) => {
        const exerciseExists = await this.exerciseRepository.findExerciseById(exerciseID);

        if(!exerciseExists) {
            throw new HttpError('Exercise not found!', 404);
        }

        const alternatives = await this.alternativeRepository.findAlternativeByExercise(exerciseExists.exerciseID);

        return alternatives;
    }
}