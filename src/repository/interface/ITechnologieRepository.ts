import { Technology } from "../../database/model/Technology";

export default interface ITechnologyRepository {
    save:(technology: Technology) => Promise<Technology>;
    listAllTechnologies:() => Promise<Technology[]>;
    findByID:(technologyID: number) => Promise<Technology | null>
}