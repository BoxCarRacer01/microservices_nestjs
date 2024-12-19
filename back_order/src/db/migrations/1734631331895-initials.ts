import { MigrationInterface, QueryRunner } from "typeorm";

export class Initials1734631331895 implements MigrationInterface {
    name = 'Initials1734631331895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`idProduct\` varchar(255) NOT NULL, \`countOrder\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
