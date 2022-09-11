import { DeleteResult } from "typeorm";
import TechnologyModel from "../../model/TechnologieModel";
import UserTechnologyModel from "../../model/UserTechnologyModel";

export default interface IUserTechnologyRepository {
    delete:(userTechnology: string) => Promise<DeleteResult>;
}