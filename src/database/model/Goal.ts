import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from "typeorm";
import IGoalProperties from "../../interfaceType/IGoalProperties";

import { User } from "./User";

@Entity()
export class Goal {
    constructor(goal?: IGoalProperties){
        if(goal) {
            this.goalID = goal.goalID;
            this.name = goal.name;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_meta"})
    goalID: number;

    @Column({name:"nm_meta",type: "varchar", length: 10, nullable:false})
    name: string;

    @Column({name: "vl_meta", type: "integer", nullable:false})
    value: number;

    @OneToMany(() => User, (user) => user.userID)
    @JoinColumn({name: "cd_meta"})
    users: User[];
}