import { Category } from "../database/model/Category";
import { Classroom } from "../database/model/Classroom";
import { Difficulty } from "../database/model/Difficulty";
import { Exercise } from "../database/model/Exercise";
import { Technology } from "../database/model/Technology";
import { User } from "../database/model/User";
import { UserChallenge } from "../database/model/UserChallenge";

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
    users?: UserChallenge[];
}