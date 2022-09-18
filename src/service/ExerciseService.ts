import HttpError from "../exceptions/HttpError";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import IExerciseRepository from "../repository/interface/IExerciseRepository";

export default class ExerciseService{
    private exerciseRepository: IExerciseRepository;

    constructor(exerciseRepository:IExerciseRepository){
        this.exerciseRepository = exerciseRepository;
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
}