import { DeleteResult } from "typeorm";
import { UserTechnology } from "../../database/model/UserTechnology";

export default interface IUserTechnologyRepository {
    findByID:(userTechnology: string) => Promise<UserTechnology | null>;
    delete:(userTechnology: string) => Promise<DeleteResult>;
}