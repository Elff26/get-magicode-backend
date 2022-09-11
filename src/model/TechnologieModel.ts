import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import UserModel from "./UserModel";
import UserTechnologyModel from "./UserTechnologyModel";

export default class TechnologyModel {
    constructor(tecnology: ITechnologyProperties) {
        this.technologyID = tecnology.technologyID;
        this.name = tecnology.name;
        this.imageUrl = tecnology.imageUrl;
        this.users = tecnology.users;
    }

    technologyID: number;
    name: string;
    imageUrl: string;
    users?: UserTechnologyModel[];
}