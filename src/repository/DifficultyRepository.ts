import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Difficulty } from "../database/model/Difficulty";
import IDifficultRepository from "./interface/IDifficultyRepository";


export default class DifficultyRepository implements IDifficultRepository{
    private difficultyRepository: Repository<Difficulty>

    constructor(){
        this.difficultyRepository = AppDataSource.manager.getRepository(Difficulty);
    }

    save = async (difficulty: Difficulty) => {
        return await this.difficultyRepository.save(difficulty);
    }

    findDifficultyById = async (difficultyID: number) => {
        return await this.difficultyRepository.findOneBy({
            difficultyID: difficultyID
        })
    }
}