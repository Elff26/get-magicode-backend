import { Technology } from "../database/model/Technology";
import { User } from "../database/model/User";

export default interface IUserTechnologyProperties {
    userTechnologyID: string;
    user: User;
    technology: Technology;
    learning?: boolean; 
    completed?: boolean;
}