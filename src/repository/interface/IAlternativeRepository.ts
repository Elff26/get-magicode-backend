import { SelectQueryBuilder } from "typeorm";
import { Alternative } from "../../database/entity/Alternative";
import { Exercise } from "../../database/entity/Exercise";
import AlternativeModel from "../../model/AlternativeModel";

export default interface IAlternativeRepository {
    save: (alternative: AlternativeModel) => Promise<AlternativeModel>;
    findAlternativeByID:(alternativeID: number) => Promise<AlternativeModel | null>;
    findAlternativeByExercise:(exerciseID: number) => Promise<Alternative[]>;
}