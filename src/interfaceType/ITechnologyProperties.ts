import { Challenge } from "../database/model/Challenge";
import { UserTechnology } from "../database/model/UserTechnology";

export default interface ITechnologyProperties {
    technologyID: number;
    name: string;
    imageUrl: string;
    users?: UserTechnology[];
    challenges?: Challenge[];
}