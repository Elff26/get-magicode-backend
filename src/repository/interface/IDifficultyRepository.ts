import DifficultyModel from "../../model/DifficultyModel";

export default interface IDifficultRepository{
    save:(classroom: DifficultyModel) => Promise<DifficultyModel>;
    findDifficultyById:(classroomID: number) => Promise<DifficultyModel | null>;
}