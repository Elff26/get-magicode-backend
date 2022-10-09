import GoalModel from "../../model/GoalModel";
import LevelModel from "../../model/LevelModel";

export default interface ILevelRepository{
    save:(level: LevelModel) => Promise<LevelModel>;
    listAllLevels:() => Promise<LevelModel[]>;
    findLevelById: (levelID: number) => Promise<LevelModel | null>
    findFirstLevel: () => Promise<LevelModel | null>
}