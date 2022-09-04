import GoalModel from "../../model/GoalModel";

export default interface IGoalRepository{
    save:(goal: GoalModel) => Promise<GoalModel>;
}