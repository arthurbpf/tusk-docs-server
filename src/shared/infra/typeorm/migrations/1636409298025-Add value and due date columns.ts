import {MigrationInterface, QueryRunner} from "typeorm";

export class AddValueAndDueDateColumns1636409298025 implements MigrationInterface {
    name = 'AddValueAndDueDateColumns1636409298025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "dueDate" date`);
        await queryRunner.query(`UPDATE "documents" SET "dueDate" = NOW()`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "dueDate" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "documents" ADD "value" double precision`);
        await queryRunner.query(`UPDATE "documents" SET "value" = 100`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "value" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "dueDate"`);
    }

}
