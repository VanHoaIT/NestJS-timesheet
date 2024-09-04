import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1725007470227 implements MigrationInterface {
    name = ' $npmConfigName1725007470227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branchs" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "display_name" character varying NOT NULL, "color" character varying NOT NULL, "working_time" jsonb, CONSTRAINT "PK_c2a14f542feef68e3968ce1766c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "levels" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "postitions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "short_name" character varying NOT NULL, "code" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_9990a5297002f357fba1617f456" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-types" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5e1950904aac94c9a1738d8a0d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "branch_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userType_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "postition_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de" FOREIGN KEY ("branch_id") REFERENCES "branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_edcd19300f32d3ee2c3e73b0b12" FOREIGN KEY ("userType_id") REFERENCES "user-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_08f642b752f63f945086eccbc8d" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0975d10f26ab3483fafd4aa8f2e" FOREIGN KEY ("postition_id") REFERENCES "postitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0975d10f26ab3483fafd4aa8f2e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_08f642b752f63f945086eccbc8d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_edcd19300f32d3ee2c3e73b0b12"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postition_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userType_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sex"`);
        await queryRunner.query(`DROP TABLE "user-types"`);
        await queryRunner.query(`DROP TABLE "postitions"`);
        await queryRunner.query(`DROP TABLE "levels"`);
        await queryRunner.query(`DROP TABLE "branchs"`);
    }

}
