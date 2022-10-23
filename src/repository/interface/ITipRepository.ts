import { Tip } from "../../database/model/Tip";

export default interface ITipRepository {
    save:(tip: Tip) => Promise<Tip>;
    findTipByExercise:(exerciseID: number) => Promise<Tip[]>;
}