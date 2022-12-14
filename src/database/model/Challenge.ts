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
import IChallengeProperties from "../../interfaceType/IChallengeProperties";

import { Category } from "./Category";
import { Classroom } from "./Classroom";
import { Difficulty } from "./Difficulty";
import { Exercise } from "./Exercise";
import { Technology } from "./Technology";
import { UserChallenge } from "./UserChallenge";

@Entity()
export class Challenge {
    constructor(challenge?: IChallengeProperties) {
        if(challenge) {
            this.challengeID = challenge.challengeID;
            this.name = challenge.name;
            this.typeChallenge = challenge.typeChallenge;
            this.creationDate = challenge.creationDate;
            this.updateDate = challenge.updateDate;
            this.technology = challenge.technology;
            this.category = challenge.category;
            this.difficulty = challenge.difficulty;
            this.classes = challenge.classes;
            this.exercises = challenge.exercises;
            this.image = challenge.image;
        }
    }

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

    @OneToMany(() => Classroom, (classroom) => classroom.challenge, {eager: true})
    classes: Classroom[];
    
    @OneToMany(() => UserChallenge, (userChallange) => userChallange.challenge, {eager: true})
    @JoinColumn({name: "cd_desafio"})
    users?: UserChallenge[];

    @OneToMany(() => Exercise, (exercise) => exercise.challenge, {eager: true})
    exercises: Exercise[];

    @Column({name:"ds_img_desafio",length: 500, nullable: true})
    image: string;
}