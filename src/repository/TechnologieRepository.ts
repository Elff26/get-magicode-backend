import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ITechnologyRepository from "./interface/ITechnologieRepository";
import { Technology } from "../database/model/Technology";

export default class TechnologyRepository implements ITechnologyRepository{
    private technologyRepository: Repository<Technology>;

    constructor(){
        this.technologyRepository = AppDataSource.manager.getRepository(Technology);
    }

    listAllTechnologies = async () => {
        return await this.technologyRepository.createQueryBuilder('Technology')
                                              .select("Technology")
                                              .getMany();
    }

    listAllTechnologiesWithExercises = async () => {
        return await this.technologyRepository.createQueryBuilder('Technology')
                                              .innerJoin('Technology.challenges', 'c')
                                              .innerJoin('c.exercises', 'e')
                                              .select("Technology")
                                              .getMany();
    }


    save = async (technology: Technology) => {
        return await this.technologyRepository.save(technology);
    }

    findByID = async (technologyID: number) => {
        return await this.technologyRepository.findOneBy({
            technologyID: technologyID
        })
    }
}
