import { Goal } from "../../database/model/Goal";

export default interface IGoalRepository{
    save:(goal: Goal) => Promise<Goal>;
    listAllGoals:() => Promise<Goal[]>;
}