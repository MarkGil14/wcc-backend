import {MigrationInterface, QueryRunner} from "typeorm";

export class AnnouncementTable1645864483414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            "CREATE TABLE" + 
            
            "`announcement` (" +
                
                "`id` int NOT NULL AUTO_INCREMENT, "+
                "`is_active` tinyint NOT NULL DEFAULT 1, "+
                "`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "+
                "`created_by` varchar(100) NULL NULL, "+
                "`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), "+
                "`updated_by` varchar(100) NULL NULL, "+
                
                "`deleted_at` datetime(6) NULL, "+
                "`version_id` int NOT NULL, "+

                "`Title` varchar(250) NOT NULL, "+
                "`Description` MEDIUMTEXT DEFAULT NULL NULL, "+
                "`Location` varchar(250) DEFAULT NULL NULL, "+
                "`Author` varchar(250) DEFAULT NULL NULL, "+
                "`DatePublish` DATE DEFAULT NULL NULL, "+
                "`Active` TINYINT(4) DEFAULT 1, "+
                
                " PRIMARY KEY (`id`)) ENGINE=InnoDB"                

        )




    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
