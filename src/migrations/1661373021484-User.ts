import { MigrationInterface, QueryRunner } from "typeorm";

export class User1661373021484 implements MigrationInterface {
    name = 'User1661373021484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("cd_usuario" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_usuario" varchar(100) NOT NULL, "dt_nascimento" date NOT NULL, "ds_email" varchar(100) NOT NULL, "nr_telefone" varchar(11) NOT NULL, "ds_senha" varchar(100) NOT NULL, "nr_vidas" integer NOT NULL, "nr_experiencia" integer NOT NULL DEFAULT (0), "dt_criacao" datetime NOT NULL DEFAULT (datetime('now')), "cd_meta" integer NOT NULL, "cd_ranking" integer NOT NULL, CONSTRAINT "UQ_26cd65d14a53fce44477b0607f5" UNIQUE ("ds_email"), CONSTRAINT "UQ_df807cd783615dd231ed83ed8e5" UNIQUE ("nr_telefone"))`);
        await queryRunner.query(`CREATE TABLE "technology" ("cd_tecnologia" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_tecnologia" varchar(60) NOT NULL, "cd_usuario" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
