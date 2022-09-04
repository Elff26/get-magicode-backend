import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ITechnologyRepository from "./interface/ITechnologieRepository";
import { Technology } from "../database/entity/Technology";
import TechnologyModel from "../model/TechnologieModel";

export default class TechnologyRepository implements ITechnologyRepository{
    private technologyRepository: Repository<Technology>;

    constructor(){
        this.technologyRepository = AppDataSource.manager.getRepository(Technology);
    }

    save = async (technology: TechnologyModel) => {
        return await this.technologyRepository.save(technology);
    }
}
