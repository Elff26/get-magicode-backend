import TechnologyModel from "../../model/TechnologieModel";
import UserTechnologyModel from "../../model/UserTechnologyModel";

export default interface ITechnologyRepository {
    save:(technology: TechnologyModel) => Promise<TechnologyModel>;
    listAllTechnologies:() => Promise<TechnologyModel[]>;
    findByID:(technologyID: number) => Promise<TechnologyModel | null>
}