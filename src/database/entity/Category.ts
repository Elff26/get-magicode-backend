import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    cd_categoria: number;

    @Column({type: "varchar", length:50, nullable: false})
    nm_categoria: string;

    @Column({type: "varchar", length:100, nullable: false})
    ds_categoria: string;
}