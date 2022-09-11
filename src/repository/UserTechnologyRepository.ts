import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ITechnologyRepository from "./interface/ITechnologieRepository";
import { Technology } from "../database/entity/Technology";
import TechnologyModel from "../model/TechnologieModel";
import { UserTechnology } from "../database/entity/UserTechnology";
import IUserTechnologyRepository from "./interface/IUserTechnologyRepository";

export default class UserTechnologyRepository implements IUserTechnologyRepository {
    private userTechnologyRepository: Repository<UserTechnology>;

    constructor(){
        this.userTechnologyRepository = AppDataSource.manager.getRepository(UserTechnology);
    }

    delete = async (userTechnologyID: string) => {
        return await this.userTechnologyRepository.delete(userTechnologyID)
    };
}
