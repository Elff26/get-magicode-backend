import { Difficulty } from "../../database/model/Difficulty";

export default interface IDifficultRepository{
    save:(classroom: Difficulty) => Promise<Difficulty>;
    findDifficultyById:(classroomID: number) => Promise<Difficulty | null>;
}