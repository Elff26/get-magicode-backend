import { Challenge } from "../database/model/Challenge";

export default interface IClassroomProperties{
    classroomID: number;
    name: string
    description: string
    creationDate: Date
    modificationDate: Date,
    challenge: Challenge
}