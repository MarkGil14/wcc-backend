import {MigrationInterface, QueryRunner} from "typeorm";

export class JobTable1646454194552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            "CREATE TABLE" + 
            
            "`job` (" +
                
                "`id` int NOT NULL AUTO_INCREMENT, "+
                "`is_active` tinyint NOT NULL DEFAULT 1, "+
                "`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "+
                "`created_by` varchar(100) NULL NULL, "+
                "`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), "+
                "`updated_by` varchar(100) NULL NULL, "+
                
                "`deleted_at` datetime(6) NULL, "+
                "`version_id` int NOT NULL, "+

                "`JobTitle` VARCHAR(250) NOT NULL, "+

                "`JobDescription` TEXT DEFAULT NULL NULL, "+
 
                "`Company` VARCHAR(250) NOT NULL, "+

                "`CompanyLogo` TEXT DEFAULT NULL NULL, "+

                "`Location` TEXT DEFAULT NULL NULL, "+

                "`ProcessingTime` VARCHAR(250) NOT NULL, "+

                "`JobImage` TEXT DEFAULT NULL NULL, "+

                "`CarrerLevel` VARCHAR(250) DEFAULT NULL NULL, "+

                "`YrsOfExp` VARCHAR(50) DEFAULT NULL NULL, "+

                
                "`Qualification` VARCHAR(250) DEFAULT NULL NULL, "+


                "`JobType` VARCHAR(50) DEFAULT NULL NULL, "+
 
 
                " PRIMARY KEY (`id`)) ENGINE=InnoDB"                

        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
