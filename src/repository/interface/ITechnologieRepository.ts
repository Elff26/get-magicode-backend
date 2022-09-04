import TechnologyModel from "../../model/TechnologieModel";

export default interface ITechnologyRepository {
    save:(technology: TechnologyModel) => Promise<TechnologyModel>;
    listAllTechnologies:() => Promise<TechnologyModel[]>;
}