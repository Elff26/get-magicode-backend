import { Exercise } from "../../database/model/Exercise";

export default interface IExerciseRepository{
    save:(exercise: Exercise) => Promise<Exercise>;
    findExerciseById:(exerciseID: number) => Promise<Exercise | null>
}