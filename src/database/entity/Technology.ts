import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { UserTechnology } from "./UserTechnology";

@Entity()
export class Technology{

    @PrimaryGeneratedColumn({ name: "cd_tecnologia" })
    technologyID: number;

    @Column({name: "nm_tecnologia", type: "varchar", length: 60, nullable: false})
    name: string;

    @Column({name: "ds_url_imagem", type: "varchar", length: 500, nullable: false})
    imageUrl: string;

    @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.technology)
    @JoinColumn({ name: 'tecnologia_usuario' })
    users: UserTechnology[]
}