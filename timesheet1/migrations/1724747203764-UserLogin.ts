import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLogin1724747203764 implements MigrationInterface {
  name = 'UserLogin1724747203764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hash_refresh_token" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hash_recovery_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "hash_recovery_token"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "hash_refresh_token"`,
    );
  }
}
