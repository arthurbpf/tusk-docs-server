import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBLOBFields1635714106724 implements MigrationInterface {
    name = 'AddBLOBFields1635714106724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "file" bytea NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "originalFileName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "originalFileName"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "file"`);
    }

}
