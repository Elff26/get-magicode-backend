import { Exercise } from "../database/model/Exercise";

export default interface ITipProperties {
    tipID: number,
    tipDescription: string;
    exercise: Exercise;
}