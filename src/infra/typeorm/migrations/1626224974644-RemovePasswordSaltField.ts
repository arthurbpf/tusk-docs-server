import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovePasswordSaltField1626224974644 implements MigrationInterface {
    name = 'RemovePasswordSaltField1626224974644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordSalt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordSalt" character varying NOT NULL`);
    }

}
