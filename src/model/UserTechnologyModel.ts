import IUserTechnologyProperties from "../interfaceType/IUserTechnologiesProperties";
import TechnologyModel from "./TechnologieModel";
import UserModel from "./UserModel";

export default class UserTechnologyModel {
    constructor(technology: TechnologyModel, user: UserModel, learning: boolean, completed: boolean, userTechnologyID: string) {
        this.userTechnologyID = userTechnologyID
        this.technology = technology;
        this.user = user;
        this.learning = learning;
        this.completed = completed;
    }

    userTechnologyID: string;
    technology: TechnologyModel;
    user: UserModel;
    learning?: boolean;
    completed?: boolean;
}