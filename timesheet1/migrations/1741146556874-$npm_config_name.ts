import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1741146556874 implements MigrationInterface {
    name = ' $npmConfigName1741146556874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branchs" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "display_name" character varying NOT NULL, "working_time" jsonb, CONSTRAINT "PK_c2a14f542feef68e3968ce1766c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "levels" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "short_name" character varying, "code" character varying, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-types" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5e1950904aac94c9a1738d8a0d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "branch_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "position_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de" FOREIGN KEY ("branch_id") REFERENCES "branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cd9740f36970d326b3f65bd5e99" FOREIGN KEY ("user_type_id") REFERENCES "user-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_08f642b752f63f945086eccbc8d" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8e29a9d2f1fa57ebf1a4ce17353" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8e29a9d2f1fa57ebf1a4ce17353"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_08f642b752f63f945086eccbc8d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cd9740f36970d326b3f65bd5e99"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sex"`);
        await queryRunner.query(`DROP TABLE "user-types"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "levels"`);
        await queryRunner.query(`DROP TABLE "branchs"`);
    }

}
