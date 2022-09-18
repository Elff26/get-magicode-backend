import { Exercise } from "../database/entity/Exercise";

export default class AlternativeModel {
    constructor(alternative: AlternativeModel) {
        this.alternativeID = alternative.alternativeID;
        this.description = alternative.description;
        this.isCorrect = alternative.isCorrect;
        this.exercise = alternative.exercise;
    }

    alternativeID: number;
    description: string;
    isCorrect: boolean;
    exercise: Exercise;
}