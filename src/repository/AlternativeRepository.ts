import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Alternative } from "../database/model/Alternative";
import IAlternativeRepository from "./interface/IAlternativeRepository";

export default class AlternativeRepository implements IAlternativeRepository {
    private alternativeRepository: Repository<Alternative>
    constructor(){
        this.alternativeRepository = AppDataSource.manager.getRepository(Alternative);
    }

    save = async (alternative: Alternative) => {
        return this.alternativeRepository.save(alternative);
    }

    findAlternativeByID = async (alternativeID: number) => {
        return this.alternativeRepository.findOneBy({
            alternativeID
        })
    }

    findAlternativeByExercise = async (exerciseID: number) => {
        return this.alternativeRepository.createQueryBuilder('Alternative')
                                            .leftJoinAndSelect('Alternative.exercise', 'e')
                                            .where('e.cd_exercicio = :exerciseID', {exerciseID})
                                            .getMany();
    }
}