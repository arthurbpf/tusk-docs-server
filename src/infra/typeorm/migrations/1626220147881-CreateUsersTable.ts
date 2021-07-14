import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1626220147881 implements MigrationInterface {
    name = 'CreateUsersTable1626220147881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "passwordSalt" character varying NOT NULL, "nickname" character varying NOT NULL, "email" character varying NOT NULL, "profilePicture" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
