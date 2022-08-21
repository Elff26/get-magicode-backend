import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ranking{

    @PrimaryGeneratedColumn()
    cd_ranking: number

    @Column({type: "integer", nullable:false, default: 0})
    vl_xp: number
}