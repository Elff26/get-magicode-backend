import { Challenge } from "../database/model/Challenge";

export default interface IDifficultyProperties{
    difficultyID: number;
    description: string;
    valueXP: number;
    challenges: Challenge[];
}