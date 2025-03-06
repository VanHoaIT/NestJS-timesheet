import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1741229417563 implements MigrationInterface {
    name = ' $npmConfigName1741229417563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-info" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "phone" character varying(10) NOT NULL, "bank" character varying NOT NULL, "bank_account" character varying NOT NULL, "current_address" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_737595561345b87f0f377f019b" UNIQUE ("userId"), CONSTRAINT "PK_17470eb7d3fd325d9c872551fc6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_info_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_03deebc191bbb5b9fd4b30abffc" UNIQUE ("user_info_id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "user-info" ADD CONSTRAINT "FK_737595561345b87f0f377f019ba" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_03deebc191bbb5b9fd4b30abffc" FOREIGN KEY ("user_info_id") REFERENCES "user-info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_03deebc191bbb5b9fd4b30abffc"`);
        await queryRunner.query(`ALTER TABLE "user-info" DROP CONSTRAINT "FK_737595561345b87f0f377f019ba"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_03deebc191bbb5b9fd4b30abffc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_info_id"`);
        await queryRunner.query(`DROP TABLE "user-info"`);
    }

}
