import { Technology } from "../database/entity/Technology";
import UserModel from "../model/UserModel";

export default interface IUserTechnologyProperties {
    userTechnologyID: string;
    user: UserModel;
    technology: Technology;
    learning?: boolean; 
    completed?: boolean;
}