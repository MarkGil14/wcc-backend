import {MigrationInterface, QueryRunner} from "typeorm";

export class ForeignKeyAdjustment1647497071903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query("ALTER TABLE `announcement_image` CHANGE COLUMN `AnnouncementID` `announcementId` INT(11) NOT NULL;")

        queryRunner.query("ALTER TABLE `profile` CHANGE COLUMN `AccountID` `accountId` INT(11) NOT NULL;")

        queryRunner.query("ALTER TABLE `account` CHANGE COLUMN `ReferenceNbr` `ReferenceNbr` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `version_id`, ADD UNIQUE INDEX `account_refnbr_unique_key` (`ReferenceNbr`)")
                
        queryRunner.query("ALTER TABLE `job_profile` CHANGE COLUMN `ProfileID` `profileId` INT(11) NOT NULL")
                
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
