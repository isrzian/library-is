import {MigrationInterface, QueryRunner} from "typeorm";

export class All1654452786758 implements MigrationInterface {
    name = 'All1654452786758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "author" character varying NOT NULL, "genre" character varying NOT NULL, "category" character varying NOT NULL, "year" integer NOT NULL, "whereBuy" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_books" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_1921179f3143b72aa9c7d38eb0b" PRIMARY KEY ("usersId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1578d9430b10917637a2f3efb8" ON "users_favorites_books" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ed677125292d05df4e148049c" ON "users_favorites_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" ADD CONSTRAINT "FK_1578d9430b10917637a2f3efb8f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" ADD CONSTRAINT "FK_4ed677125292d05df4e148049c4" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_books" DROP CONSTRAINT "FK_4ed677125292d05df4e148049c4"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" DROP CONSTRAINT "FK_1578d9430b10917637a2f3efb8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ed677125292d05df4e148049c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1578d9430b10917637a2f3efb8"`);
        await queryRunner.query(`DROP TABLE "users_favorites_books"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
