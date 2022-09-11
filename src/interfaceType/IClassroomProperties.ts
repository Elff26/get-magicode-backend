import TechnologyModel from "../model/TechnologieModel";

export default interface IClassroomProperties{
    classroomID: number;
    name: string
    description: string
    creationDate: Date
    modificationDate: Date
    technologyCode: TechnologyModel
    categoryCode: number
}