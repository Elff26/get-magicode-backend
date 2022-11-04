import { Level } from "../../database/model/Level";

export default interface ILevelRepository{
    save:(level: Level) => Promise<Level>;
    listAllLevels:() => Promise<Level[]>;
    findLevelById: (levelID: number) => Promise<Level | null>;
    findFirstLevel: () => Promise<Level | null>;
    findLevelForUser: (userXp: number) => Promise<Level>;
}