import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    JoinColumn, 
    ManyToOne
} from "typeorm";
import IClassroomProperties from "../../interfaceType/IClassroomProperties";

import { Challenge } from "./Challenge";

@Entity()
export class Classroom{
    constructor(classroom?: IClassroomProperties){
        if(classroom) {
            this.classroomID = classroom.classroomID;
            this.name = classroom.name;
            this.description = classroom.description;
            this.creationDate = classroom.creationDate;
            this.modificationDate = classroom.modificationDate;
        }
    }

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

    @ManyToOne(()=> Challenge, (challange) => challange.classes)
    @JoinColumn({name:"cd_desafio"})
    challenge: Challenge;
}