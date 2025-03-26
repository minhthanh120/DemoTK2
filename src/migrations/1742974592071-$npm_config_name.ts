import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1742974592071 implements MigrationInterface {
    name = ' $npmConfigName1742974592071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."User_gender_enum" AS ENUM('m', 'f', 'u')`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(30) NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(40) NOT NULL, "dateofbirth" date, "gender" "public"."User_gender_enum" NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("productId" character varying NOT NULL, "categoryId" character varying NOT NULL, CONSTRAINT "PK_7e60cbb6e911363b5ff8ed28e85" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "public"."User_gender_enum"`);
    }

}
