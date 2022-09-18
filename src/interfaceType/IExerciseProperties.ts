import { Alternative } from "../database/entity/Alternative";
import { Tip } from "../database/entity/Tip";
import ChallengeModel from "../model/ChallengeModel";

export default interface IExerciseProperties{
    exerciseID: number;
    name: string
    description: string
    expectedOutput: string
    creationDate: Date
    modificationDate: Date
    challenge: ChallengeModel
    type: string
    tips: Tip[];
    alternatives: Alternative[];
}