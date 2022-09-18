import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1662836170065 implements MigrationInterface {
    name = 'NomeDaMigration1662836170065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "goal" ("cd_meta" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_meta" varchar(10) NOT NULL, "vl_meta" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "technology" ("cd_tecnologia" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_tecnologia" varchar(60) NOT NULL, "ds_url_imagem" varchar(500) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("cd_usuario" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_usuario" varchar(100) NOT NULL, "dt_nascimento" date NOT NULL, "ds_email" varchar(100) NOT NULL, "nr_telefone" varchar(11) NOT NULL, "ds_senha" varchar(100) NOT NULL, "nr_vidas" integer NOT NULL DEFAULT (0), "nr_experiencia" integer NOT NULL DEFAULT (0), "dt_criacao" datetime NOT NULL DEFAULT (datetime('now')), "cd_ranking" integer NOT NULL DEFAULT (0), "cod_alteracao_senha" varchar NOT NULL DEFAULT (''), "dt_expiracao_senha" date, "cd_meta" integer, CONSTRAINT "UQ_26cd65d14a53fce44477b0607f5" UNIQUE ("ds_email"), CONSTRAINT "UQ_df807cd783615dd231ed83ed8e5" UNIQUE ("nr_telefone"))`);
        await queryRunner.query(`CREATE TABLE "T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia" integer NOT NULL, "userCdUsuario" integer NOT NULL, PRIMARY KEY ("technologyCdTecnologia", "userCdUsuario"))`);
        await queryRunner.query(`CREATE INDEX "IDX_418ddc49eb6f234e34bad49f05" ON "T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c525d1eaea271d75d321b9015" ON "T_USUARIO_TECNOLOGIA" ("userCdUsuario") `);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("cd_usuario" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_usuario" varchar(100) NOT NULL, "dt_nascimento" date NOT NULL, "ds_email" varchar(100) NOT NULL, "nr_telefone" varchar(11) NOT NULL, "ds_senha" varchar(100) NOT NULL, "nr_vidas" integer NOT NULL DEFAULT (0), "nr_experiencia" integer NOT NULL DEFAULT (0), "dt_criacao" datetime NOT NULL DEFAULT (datetime('now')), "cd_ranking" integer NOT NULL DEFAULT (0), "cod_alteracao_senha" varchar NOT NULL DEFAULT (''), "dt_expiracao_senha" date, "cd_meta" integer, CONSTRAINT "UQ_26cd65d14a53fce44477b0607f5" UNIQUE ("ds_email"), CONSTRAINT "UQ_df807cd783615dd231ed83ed8e5" UNIQUE ("nr_telefone"), CONSTRAINT "FK_2691f06f77a1cda1354534b50c2" FOREIGN KEY ("cd_meta") REFERENCES "goal" ("cd_meta") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("cd_usuario", "nm_usuario", "dt_nascimento", "ds_email", "nr_telefone", "ds_senha", "nr_vidas", "nr_experiencia", "dt_criacao", "cd_ranking", "cod_alteracao_senha", "dt_expiracao_senha", "cd_meta") SELECT "cd_usuario", "nm_usuario", "dt_nascimento", "ds_email", "nr_telefone", "ds_senha", "nr_vidas", "nr_experiencia", "dt_criacao", "cd_ranking", "cod_alteracao_senha", "dt_expiracao_senha", "cd_meta" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_418ddc49eb6f234e34bad49f05"`);
        await queryRunner.query(`DROP INDEX "IDX_2c525d1eaea271d75d321b9015"`);
        await queryRunner.query(`CREATE TABLE "temporary_T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia" integer NOT NULL, "userCdUsuario" integer NOT NULL, CONSTRAINT "FK_418ddc49eb6f234e34bad49f05b" FOREIGN KEY ("technologyCdTecnologia") REFERENCES "technology" ("cd_tecnologia") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2c525d1eaea271d75d321b9015b" FOREIGN KEY ("userCdUsuario") REFERENCES "user" ("cd_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("technologyCdTecnologia", "userCdUsuario"))`);
        await queryRunner.query(`INSERT INTO "temporary_T_USUARIO_TECNOLOGIA"("technologyCdTecnologia", "userCdUsuario") SELECT "technologyCdTecnologia", "userCdUsuario" FROM "T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`DROP TABLE "T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`ALTER TABLE "temporary_T_USUARIO_TECNOLOGIA" RENAME TO "T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`CREATE INDEX "IDX_418ddc49eb6f234e34bad49f05" ON "T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c525d1eaea271d75d321b9015" ON "T_USUARIO_TECNOLOGIA" ("userCdUsuario") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2c525d1eaea271d75d321b9015"`);
        await queryRunner.query(`DROP INDEX "IDX_418ddc49eb6f234e34bad49f05"`);
        await queryRunner.query(`ALTER TABLE "T_USUARIO_TECNOLOGIA" RENAME TO "temporary_T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`CREATE TABLE "T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia" integer NOT NULL, "userCdUsuario" integer NOT NULL, PRIMARY KEY ("technologyCdTecnologia", "userCdUsuario"))`);
        await queryRunner.query(`INSERT INTO "T_USUARIO_TECNOLOGIA"("technologyCdTecnologia", "userCdUsuario") SELECT "technologyCdTecnologia", "userCdUsuario" FROM "temporary_T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`DROP TABLE "temporary_T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`CREATE INDEX "IDX_2c525d1eaea271d75d321b9015" ON "T_USUARIO_TECNOLOGIA" ("userCdUsuario") `);
        await queryRunner.query(`CREATE INDEX "IDX_418ddc49eb6f234e34bad49f05" ON "T_USUARIO_TECNOLOGIA" ("technologyCdTecnologia") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("cd_usuario" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nm_usuario" varchar(100) NOT NULL, "dt_nascimento" date NOT NULL, "ds_email" varchar(100) NOT NULL, "nr_telefone" varchar(11) NOT NULL, "ds_senha" varchar(100) NOT NULL, "nr_vidas" integer NOT NULL DEFAULT (0), "nr_experiencia" integer NOT NULL DEFAULT (0), "dt_criacao" datetime NOT NULL DEFAULT (datetime('now')), "cd_ranking" integer NOT NULL DEFAULT (0), "cod_alteracao_senha" varchar NOT NULL DEFAULT (''), "dt_expiracao_senha" date, "cd_meta" integer, CONSTRAINT "UQ_26cd65d14a53fce44477b0607f5" UNIQUE ("ds_email"), CONSTRAINT "UQ_df807cd783615dd231ed83ed8e5" UNIQUE ("nr_telefone"))`);
        await queryRunner.query(`INSERT INTO "user"("cd_usuario", "nm_usuario", "dt_nascimento", "ds_email", "nr_telefone", "ds_senha", "nr_vidas", "nr_experiencia", "dt_criacao", "cd_ranking", "cod_alteracao_senha", "dt_expiracao_senha", "cd_meta") SELECT "cd_usuario", "nm_usuario", "dt_nascimento", "ds_email", "nr_telefone", "ds_senha", "nr_vidas", "nr_experiencia", "dt_criacao", "cd_ranking", "cod_alteracao_senha", "dt_expiracao_senha", "cd_meta" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP INDEX "IDX_2c525d1eaea271d75d321b9015"`);
        await queryRunner.query(`DROP INDEX "IDX_418ddc49eb6f234e34bad49f05"`);
        await queryRunner.query(`DROP TABLE "T_USUARIO_TECNOLOGIA"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "goal"`);
    }

}
