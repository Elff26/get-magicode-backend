import { Alternative } from "../database/model/Alternative";
import { Challenge } from "../database/model/Challenge";
import { Tip } from "../database/model/Tip";

export default interface IExerciseProperties{
    exerciseID: number;
    name: string
    description: string
    expectedOutput: string
    creationDate: Date
    modificationDate: Date
    challenge: Challenge
    type: string
    tips: Tip[];
    alternatives: Alternative[];
}