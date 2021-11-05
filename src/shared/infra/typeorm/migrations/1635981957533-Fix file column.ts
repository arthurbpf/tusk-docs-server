import {MigrationInterface, QueryRunner} from "typeorm";

export class FixFileColumn1635981957533 implements MigrationInterface {
    name = 'FixFileColumn1635981957533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "file" TO "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "fileUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "fileUrl" bytea NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "fileUrl" TO "file"`);
    }

}
