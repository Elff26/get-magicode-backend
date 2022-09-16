import ChallengeModel from "../model/ChallengeModel";
import ClassroomModel from "../model/ClassroomModel";

export default interface IExerciseProperties{
    exerciseID: number;
    name: string
    description: string
    expectedOutput: string
    difficult: string
    creationDate: Date
    modificationDate: Date
    challenge: ChallengeModel
    type: string
}