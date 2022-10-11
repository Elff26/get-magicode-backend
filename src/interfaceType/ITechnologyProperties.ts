import { UserTechnology } from "../database/model/UserTechnology";

export default interface ITechnologyProperties {
    technologyID: number;
    name: string;
    imageUrl: string;
    users?: UserTechnology[];
}