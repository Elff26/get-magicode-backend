import { SelectQueryBuilder } from "typeorm";
import { Alternative } from "../../database/model/Alternative";

export default interface IAlternativeRepository {
    save: (alternative: Alternative) => Promise<Alternative>;
    findAlternativeByID:(alternativeID: number) => Promise<Alternative | null>;
    findAlternativeByExercise:(exerciseID: number) => Promise<Alternative[]>;
}