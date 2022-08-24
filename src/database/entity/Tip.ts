import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tip {

    @PrimaryGeneratedColumn()
    cd_dica: number;

    @Column({type: "varchar", length:100, nullable: false})
    ds_dica: string;

    @Column({type: "integer", nullable: false})
    cd_exercicio: number;
}

