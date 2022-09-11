import IClassroomProperties from "../interfaceType/IClassroomProperties";
import TechnologyModel from "./TechnologieModel";

export default class ClassroomModel{
    constructor(classroom: IClassroomProperties){
        this.classroomID = classroom.classroomID;
        this.name = classroom.name;
        this.description = classroom.description;
        this.creationDate = classroom.creationDate;
        this.modificationDate = classroom.modificationDate;
        this.technologyCode = classroom.technologyCode;
        this.categoryCode = classroom.categoryCode;
    }
    classroomID: number;
    name: string
    description: string
    creationDate: Date
    modificationDate: Date
    technologyCode: TechnologyModel
    categoryCode: number
}