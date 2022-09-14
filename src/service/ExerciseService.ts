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
}