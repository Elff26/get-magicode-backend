import { Exercise } from "../../database/entity/Exercise";
import ExerciseModel from "../../model/ExerciseModel";

export default interface IExerciseRepository{
    save:(exercise: ExerciseModel) => Promise<ExerciseModel>;
    findExerciseById:(exerciseID: number) => Promise<ExerciseModel | null>
}