import { Exercise } from "../database/model/Exercise";

export default interface ITipProperties {
    tipID: number,
    description: string;
    exercise: Exercise;
}