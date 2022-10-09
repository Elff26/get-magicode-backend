import ILevelProperties from "../interfaceType/ILevelProperties";
import ILevelRepository from "../repository/interface/ILevelRepository";

export default class LevelService {
    private levelRepository: ILevelRepository;

    constructor(levelRepository: ILevelRepository){
        this.levelRepository = levelRepository;
    }

    createLevel = async (level: ILevelProperties) => {
        return await this.levelRepository.save(level);
    }

    listAllLevels = async () => {
        return await this.levelRepository.listAllLevels();
    }

    findLevelById = async (levelID: number) => {
        return await this.levelRepository.findLevelById(levelID);
    }
}