import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Exercise } from "../database/model/Exercise";
import IExerciseRepository from "./interface/IExerciseRepository";

export default class ExerciseRepository implements IExerciseRepository{
    private exerciseRepository: Repository<Exercise>

    constructor(){
        this.exerciseRepository = AppDataSource.manager.getRepository(Exercise);
    }

    save = async (exercise: Exercise) => {
        exercise.description = JSON.stringify(exercise.description);

        return await this.exerciseRepository.save(exercise);
    }

    findExerciseById = async (exerciseID: number) => {
        return await this.exerciseRepository.findOneBy({
            exerciseID: exerciseID
        })
    }
}