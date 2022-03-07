import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfileTable1646454012938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "CREATE TABLE" + 
            
            "`profile` (" +
                
                "`id` int NOT NULL AUTO_INCREMENT, "+
                "`is_active` tinyint NOT NULL DEFAULT 1, "+
                "`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "+
                "`created_by` varchar(100) NULL NULL, "+
                "`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), "+
                "`updated_by` varchar(100) NULL NULL, "+
                
                "`deleted_at` datetime(6) NULL, "+
                "`version_id` int NOT NULL, "+

                "`AccountID` INT NOT NULL, "+
                "`FirstName`  varchar(150) NOT NULL, "+     
                "`LastName`  varchar(150) DEFAULT NULL NULL, "+     
                "`MiddleName`  varchar(150) DEFAULT NULL NULL, "+     
                "`Gender`  varchar(50) DEFAULT NULL NULL, "+     
                "`BirthDate`  DATE DEFAULT NULL NULL, "+     
                "`Avatar`  TEXT DEFAULT NULL NULL, "+     
 

                " PRIMARY KEY (`id`)) ENGINE=InnoDB"                

        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
