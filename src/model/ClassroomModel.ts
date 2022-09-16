import IClassroomProperties from "../interfaceType/IClassroomProperties";

export default class ClassroomModel{
    constructor(classroom: IClassroomProperties){
        this.classroomID = classroom.classroomID;
        this.name = classroom.name;
        this.description = classroom.description;
        this.creationDate = classroom.creationDate;
        this.modificationDate = classroom.modificationDate;
    }
    classroomID: number;
    name: string
    description: string
    creationDate: Date
    modificationDate: Date
}