import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaidColumnInDocuments1636472237011 implements MigrationInterface {
    name = 'AddPaidColumnInDocuments1636472237011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "paid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "paid"`);
    }

}
