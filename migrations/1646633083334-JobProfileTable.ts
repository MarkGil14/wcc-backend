import {MigrationInterface, QueryRunner} from "typeorm";

export class JobProfileTable1646633083334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            "CREATE TABLE" + 
            
            "`job_profile` (" +
                
                "`id` int NOT NULL AUTO_INCREMENT, "+
                "`is_active` tinyint NOT NULL DEFAULT 1, "+
                "`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "+
                "`created_by` varchar(100) NULL NULL, "+
                "`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), "+
                "`updated_by` varchar(100) NULL NULL, "+
                
                "`deleted_at` datetime(6) NULL, "+
                "`version_id` int NOT NULL, "+




                "`ProfileID` INT NOT NULL, "+

                "`CompanyAddress` TEXT DEFAULT NULL NULL, "+
 
                "`Company` VARCHAR(250) NOT NULL, "+
 
                "`IsYourJobRelated` TINYINT(4) DEFAULT 0, "+
 
                "`Position` VARCHAR(250) DEFAULT NULL NULL, "+

                "`NoOfYrs` VARCHAR(50)  DEFAULT NULL NULL, "+

                " PRIMARY KEY (`id`)) ENGINE=InnoDB"                

        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
