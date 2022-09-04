import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";

@Entity()
export class Technology{

    @PrimaryGeneratedColumn({ name: "cd_tecnologia" })
    technologyID: number;

    @Column({name: "nm_tecnologia", type: "varchar", length: 60, nullable: false})
    name: string;

    @Column({name: "ds_url_imagem", type: "varchar", length: 500, nullable: false})
    imageUrl: string;

    @ManyToMany(() => User, (user) => user.technologies)
    @JoinTable({ name: "T_USUARIO_TECNOLOGIA" })
    users: User[]
}