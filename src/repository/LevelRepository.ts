import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Level } from "../database/model/Level";
import ILevelRepository from "./interface/ILevelRepository";

export default class LevelRepository implements ILevelRepository{
    private levelRepository: Repository<Level>
    constructor(){
        this.levelRepository = AppDataSource.manager.getRepository(Level);
    }

    save = async (level: Level) => {
        return await this.levelRepository.save(level);
    }

    listAllLevels = async () => {
        return await this.levelRepository.find();
    }

    findLevelById = async (levelID: number) => {
        return await this.levelRepository.findOneBy({
            levelID: levelID
        });
    }

    findFirstLevel = async () => {
        return await this.levelRepository.createQueryBuilder("Level")
                                            .orderBy('Level.levelNumber', 'ASC')
                                            .getOne();
    }

    findLevelForUser = async (userXp: number, levelNumber: number) => {
        return await this.levelRepository.createQueryBuilder("Level")
                                            .where(':userXp < Level.valueXp', {userXp})
                                            .andWhere('Level.levelNumber >= :levelNumber', {levelNumber})
                                            .orderBy('Level.valueXp', 'ASC')
                                            .getOne();
    }
}