import UserModel from "../model/UserModel";
import UserTechnologyModel from "../model/UserTechnologyModel";

export default interface ITechnologyProperties {
    technologyID: number;
    name: string;
    imageUrl: string;
    users?: UserTechnologyModel[];
}