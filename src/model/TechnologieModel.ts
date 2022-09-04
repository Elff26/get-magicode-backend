import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import UserModel from "./UserModel";

export default class TechnologyModel {
    constructor(tecnology: ITechnologyProperties) {
        this.technologyID = tecnology.technologyID;
        this.name = tecnology.name;
        this.users = tecnology.users;
    }

    technologyID: number;
    name: string
    users?: UserModel[]
}