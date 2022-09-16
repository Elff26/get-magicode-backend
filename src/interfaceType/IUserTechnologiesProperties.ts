import { Technology } from "../database/entity/Technology";
import TechnologyModel from "../model/TechnologieModel";
import UserModel from "../model/UserModel";

export default interface IUserTechnologyProperties {
    userTechnologyID: string;
    user: UserModel;
    technology: TechnologyModel;
    learning?: boolean; 
    completed?: boolean;
}