import { 
    Column, 
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

import { Category } from "./Category";
import { Classroom } from "./Classroom";
import { Difficulty } from "./Difficulty";
import { Exercise } from "./Exercise";
import { Technology } from "./Technology";

@Entity()
export class Challenge {
    @PrimaryGeneratedColumn({name:"cd_desafio"})
    challengeID: number;

    @Column({name:"nm_desafio", type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({name:"tp_desafio", type: "varchar", length: 20, nullable: false})
    typeChallenge: string;

    @CreateDateColumn({name:"dt_criacao"})
    creationDate: Date;

    @UpdateDateColumn({name:"dt_atualizacao"})
    updateDate: Date;

    @ManyToOne(()=> Technology, (technology) => technology.technologyID, {eager: true})
    @JoinColumn({name: "cd_tecnologia"})
    technology: Technology;

    @ManyToOne(()=> Category, (category) => category.categoryID, {eager: true})
    @JoinColumn({name: "cd_categoria"})
    category: Category;

    @ManyToOne(()=> Difficulty, (difficulty) => difficulty.difficultyID, {eager: true})
    @JoinColumn({name: "cd_dificuldade"})
    difficulty: Difficulty;

    @OneToMany(() => Classroom, (clasroom) => clasroom.challange, {eager: true})
    classes: Classroom[];

    @OneToMany(() => Exercise, (exercise) => exercise.challenge, {eager: true})
    exercises: Classroom[];
}