import { Exercise } from "../database/entity/Exercise";

export default interface IAlternativeProperties {
    alternativeID: number;
    description: string;
    isCorrect: boolean;
    exercise: Exercise;
}