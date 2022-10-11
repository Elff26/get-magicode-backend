import { Exercise } from "../database/model/Exercise";

export default interface IAlternativeProperties {
    alternativeID: number;
    description: string;
    isCorrect: boolean;
    exercise: Exercise;
}