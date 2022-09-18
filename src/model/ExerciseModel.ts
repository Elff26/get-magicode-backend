import { Alternative } from "../database/entity/Alternative";
import { Tip } from "../database/entity/Tip";
import IExerciseProperties from "../interfaceType/IExerciseProperties";
import ChallengeModel from "./ChallengeModel";

export default class ExerciseModel{
    constructor(exercise: IExerciseProperties){
        this.exerciseID = exercise.exerciseID;
        this.name = exercise.name;
        this.description = exercise.description;
        this.creationDate = exercise.creationDate;
        this.modificationDate = exercise.modificationDate;
        this.challenge = exercise.challenge;
        this.type = exercise.type;
        this.tips = exercise.tips;
        this.alternatives = exercise.alternatives;
    }
    exerciseID: number;
    name: string
    description: string
    expectedOutput: string
    creationDate: Date
    modificationDate: Date
    challenge: ChallengeModel
    type: string
    tips: Tip[]
    alternatives: Alternative[]
}