import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('job')
export class Job extends CustomBaseEntity {

    @PrimaryGeneratedColumn({
    })
    id: number;


    @Column({
        length: 250,
        nullable: false
    })
    JobTitle : string;



    @Column({
        nullable: true
    })
    JobDescription : string;


    @Column({
        nullable: true
    })
    Company : string;

    @Column({
        nullable: true
    })
    CompanyLogo: string;


    @Column({
        nullable: true
    })
    Location : string;



    @Column({
        nullable: true
    })
    ProcessingTime : string;
 


    @Column({
        nullable: true
    })
    JobImage : string;



    @Column({
        nullable: true
    })
    CarrerLevel : string;

 

    @Column({
        nullable: true
    })
    YrsOfExp : string;

 

    @Column({
        nullable: true
    })
    Qualification : string;

 


    @Column({
        nullable: true
    })
    JobType : string;



    

    // @Column({
    //     nullable: true
    // })
    // Active : boolean;



}