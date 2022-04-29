import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('job_specialization')
export class JobSpecialization extends CustomBaseEntity {

    @PrimaryGeneratedColumn({
    })
    id: number;



    @Column({
        nullable: false
    })
    JobID : number;


    @Column({
        nullable : true
    })
    JobSpecialization : string;

    


}