import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Challenge } from "./Challenge";
import { User } from "./User";

@Entity({ name: 'user_challenge' })
export class UserChallenge {
    constructor(userChallengeID?: number, user?: User, challenge?: Challenge, completed?: boolean) {
        if(userChallengeID && user && challenge && completed) {
            this.userChallengeID = userChallengeID;
            this.user = user;
            this.challenge = challenge;
            this.completed = completed;
        }
    }

    @PrimaryGeneratedColumn('increment', {
        name: "usuario_desafio_id"
    })
    userChallengeID?: number;

    @ManyToOne(() => User, (user) => user.technologies)
    @JoinColumn({name: 'cd_usuario'})
    user: User;

    @ManyToOne(() => Challenge, (challange) => challange.users)
    @JoinColumn({name: 'cd_desafio'})
    challenge: Challenge;

    @Column({name: "st_completo", type: 'boolean', nullable: false, default: false})
    completed?: boolean;
}