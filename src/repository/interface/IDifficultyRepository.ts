import { Difficulty } from "../../database/model/Difficulty";

export default interface IDifficultRepository{
    save:(classroom: Difficulty) => Promise<Difficulty>;
    findAllDifficulties: () => Promise<Difficulty[]>;
    findDifficultyById:(classroomID: number) => Promise<Difficulty | null>;
}