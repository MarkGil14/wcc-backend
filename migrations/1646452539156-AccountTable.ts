import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountTable1646452539156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            "CREATE TABLE" + 
            
            "`account` (" +
                
                "`id` int NOT NULL AUTO_INCREMENT, "+
                "`is_active` tinyint NOT NULL DEFAULT 1, "+
                "`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "+
                "`created_by` varchar(100) NULL NULL, "+
                "`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), "+
                "`updated_by` varchar(100) NULL NULL, "+
                
                "`deleted_at` datetime(6) NULL, "+
                "`version_id` int NOT NULL, "+

                "`ReferenceNbr` varchar(50) NOT NULL, "+
                "`AccountType`  varchar(50) NOT NULL, "+     
                "`BatchYr`  varchar(50) DEFAULT NULL NULL, "+     
                "`ContactNo`  varchar(50) DEFAULT NULL NULL, "+     

                "`Email`  varchar(250) NOT NULL, "+     
                "`Password` varchar(250) NOT NULL, "+                     
                "`Active`  TINYINT(4) DEFAULT 1, "+                 
                "`IsVerified` TINYINT(4) DEFAULT 0, "+     

              

                " PRIMARY KEY (`id`)) ENGINE=InnoDB"                

        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
