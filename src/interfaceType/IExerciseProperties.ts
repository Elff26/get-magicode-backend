import ChallengeModel from "../model/ChallengeModel";
import ClassroomModel from "../model/ClassroomModel";

export default interface IExerciseProperties{
    exerciseID: number;
    name: string
    description: string
    expectedExit: string
    descriptionDifficult: string
    creationDate: Date
    modificationDate: Date
    challengeID: ChallengeModel
    type: string
}