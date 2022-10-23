import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Tip } from "../database/model/Tip";
import ITipRepository from "./interface/ITipRepository";

export default class TipRepository implements ITipRepository{
    private tipRepository: Repository<Tip>
    constructor(){
        this.tipRepository = AppDataSource.manager.getRepository(Tip);
    }

    save = async (tip: Tip) => {
        return await this.tipRepository.save(tip);
    }

    findTipByExercise = async(exerciseID: number) =>{
        return await this.tipRepository.createQueryBuilder('Tip')
                                        .leftJoinAndSelect('Tip.exercise', 'exercise')
                                        .where('exercise.cd_exercicio = :exerciseID', { exerciseID })
                                        .getMany();
    }
}