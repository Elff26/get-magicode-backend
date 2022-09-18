import { Category } from "../database/entity/Category";
import { Classroom } from "../database/entity/Classroom";
import { Difficulty } from "../database/entity/Difficulty";
import { Exercise } from "../database/entity/Exercise";
import { Technology } from "../database/entity/Technology";

export default interface IChallengeProperties {
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