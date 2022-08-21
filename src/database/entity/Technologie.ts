import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Technologie{

    @PrimaryGeneratedColumn()
    tech_id: number;
}