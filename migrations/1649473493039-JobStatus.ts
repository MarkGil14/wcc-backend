import {MigrationInterface, QueryRunner} from "typeorm";

export class JobStatus1649473493039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(" ALTER TABLE `job` ADD COLUMN `Status` VARCHAR(50) NULL DEFAULT 'Open' ")
        queryRunner.query(" ALTER TABLE `job` CHANGE COLUMN `ProcessingTime` `ProcessingTime` VARCHAR(250) NULL  ")

               
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
