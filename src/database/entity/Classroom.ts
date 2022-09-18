import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    JoinColumn, 
    OneToMany, 
    ManyToOne
} from "typeorm";

import { Challenge } from "./Challenge";
import { UserClassroom } from "./UserClassroom";

@Entity()
export class Classroom{
    @PrimaryGeneratedColumn({ name: "cd_aula" })
    classroomID: number;

    @Column({name:"nm_aula",type: "varchar", length: 50, nullable: false})
    name: string;

    //TODO: Mudar type para jsonb em ambiente de PROD
    @Column({name:"ds_conteudo",type: "varchar", nullable: false})
    description: string;

    @CreateDateColumn({name: "dt_criacao"})
    creationDate: Date;

    @UpdateDateColumn({name:"dt_modificacao"})
    modificationDate: Date;

    @OneToMany(() => UserClassroom, (userClassroom) => userClassroom.classroom)
    @JoinColumn({name: "usuario_aula"})
    users: UserClassroom[];

    @ManyToOne(()=> Challenge, (challange) => challange.classes)
    @JoinColumn({name:"cd_desafio"})
    challenge: Challenge;
}