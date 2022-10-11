import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { UserTechnology } from "../database/model/UserTechnology";
import IUserTechnologyRepository from "./interface/IUserTechnologyRepository";

export default class UserTechnologyRepository implements IUserTechnologyRepository {
    private userTechnologyRepository: Repository<UserTechnology>;

    constructor(){
        this.userTechnologyRepository = AppDataSource.manager.getRepository(UserTechnology);
    }

    findByID = async (userTechnologyID: string) => {
        return await this.userTechnologyRepository.findOne({
            where: {
                userTechnologyID: userTechnologyID
            }
        })
    }

    delete = async (userTechnologyID: string) => {
        return await this.userTechnologyRepository.delete(userTechnologyID)
    };
}
