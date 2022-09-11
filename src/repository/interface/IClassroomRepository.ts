import ClassroomModel from "../../model/ClassroomModel";

export default interface IClassroomRepository{
    save:(classroom: ClassroomModel) => Promise<ClassroomModel>;
    findClassroomById:(classroomID: number) => Promise<ClassroomModel | null>;
}