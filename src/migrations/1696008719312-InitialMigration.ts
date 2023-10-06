import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696008719312 implements MigrationInterface {
    name = 'InitialMigration1696008719312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_time" date NOT NULL, "comment" character varying NOT NULL, "userId" uuid, "anouncementId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cover_img" character varying(300) NOT NULL, "first_img" character varying(300) NOT NULL, "second_img" character varying(300) NOT NULL, "anouncementId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anouncements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(15) NOT NULL, "model" character varying(25) NOT NULL, "year" smallint NOT NULL, "fuel" character varying(15) NOT NULL, "mileage" character varying(8) NOT NULL, "color" character varying(15) NOT NULL, "fipe_price" double precision NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_c96a8cc85ae35a5f59b0eb0d272" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_account_enum" AS ENUM('buyer', 'seller')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(11) NOT NULL, "description" character varying NOT NULL, "type_account" "public"."users_type_account_enum" NOT NULL DEFAULT 'buyer', "password" character varying(120) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip_code" character varying(8) NOT NULL, "state" character varying(30) NOT NULL, "city" character varying(30) NOT NULL, "street_name" character varying(70) NOT NULL, "street_number" smallint NOT NULL, "comp_address" character varying(70) NOT NULL, "userId" uuid, CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_55c1eee70dc5c5b6e62c37cfe99" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anouncements" ADD CONSTRAINT "FK_e267ed4442b36dddaff4b9f1986" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "anouncements" DROP CONSTRAINT "FK_e267ed4442b36dddaff4b9f1986"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_55c1eee70dc5c5b6e62c37cfe99"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_account_enum"`);
        await queryRunner.query(`DROP TABLE "anouncements"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
