import { Category } from "../database/entity/Category";
import { Classroom } from "../database/entity/Classroom";
import { Difficulty } from "../database/entity/Difficulty";
import { Exercise } from "../database/entity/Exercise";
import { Technology } from "../database/entity/Technology";
import IChallengeProperties from "../interfaceType/IChallengeProperties";

export default class ChallengeModel{
    constructor(challenge: IChallengeProperties){
        this.challengeID = challenge.challengeID;
        this.name = challenge.name;
        this.typeChallenge = challenge.typeChallenge;
        this.creationDate = challenge.creationDate;
        this.updateDate = challenge.updateDate;
        this.technology = challenge.technology;
        this.category = challenge.category;
        this.difficulty = challenge.difficulty;
        this.classes = challenge.classes;
        this.exercises = challenge.exercises;
        this.image = challenge.image;
    }
    
    challengeID: number;
    name: string;
    typeChallenge: string;
    creationDate: Date;
    updateDate: Date;
    technology: Technology;
    category: Category;
    difficulty: Difficulty;
    classes: Classroom[];
    exercises: Exercise[];
    image: string;
}