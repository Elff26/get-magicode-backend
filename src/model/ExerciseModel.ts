import IExerciseProperties from "../interfaceType/IExerciseProperties";
import ChallengeModel from "./ChallengeModel";

export default class ExerciseModel{
    constructor(exercise: IExerciseProperties){
        this.exerciseID = exercise.exerciseID;
        this.name = exercise.name;
        this.description = exercise.expectedExit;
        this.descriptionDifficult = exercise.descriptionDifficult;
        this.creationDate = exercise.creationDate;
        this.modificationDate = exercise.modificationDate;
        this.challengeID = exercise.challengeID;
        this.type = exercise.type;
    }
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