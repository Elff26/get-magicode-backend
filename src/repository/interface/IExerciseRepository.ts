import ExerciseModel from "../../model/ExerciseModel";

export default interface IExerciseRepository{
    save:(exercise: ExerciseModel) => Promise<ExerciseModel>;
}