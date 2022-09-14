import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Difficulty{
    @PrimaryGeneratedColumn({name:"cd_dificuldade"})
    difficultyID: number;

    @Column({name:"ds_dificuldade", type: "varchar", length: 20, nullable: false})
    description: string

    @Column({name:"vl_xp", type: "integer", nullable: false})
    valueXP: string
}