import { Classroom } from "../../database/model/Classroom";

export default interface IClassroomRepository{
    save:(classroom: Classroom) => Promise<Classroom>;
    findClassroomById:(classroomID: number) => Promise<Classroom | null>;
    findClassroomByChallenge:(challengeID: number) => Promise<Classroom[]>;
    countAllClassrooms: () => Promise<number>
}