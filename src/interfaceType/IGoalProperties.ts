import { User } from "../database/model/User";

export default interface IGoalProperties{
    goalID: number;
    name: string;
    value: number;
    users?: User[];
}