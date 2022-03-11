import { profile } from 'console';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '.';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('job_profile')
export class JobProfile extends CustomBaseEntity {

    @PrimaryGeneratedColumn({
    })
    id: number;



    @Column()
    ProfileID : number;



    @Column({
        nullable: true
    })
    Company : string;


    @Column({
        nullable: true
    })
    CompanyAddress : string;



    @Column({
        nullable: true
    })
    IsYourJobRelated : boolean;




    @Column({
        nullable: true
    })
    Position : string;




    @Column({
        nullable: true
    })
    NoOfYrs : string;


    @ManyToOne(() => Profile, profile => profile.job_profiles)
    profile : Profile;



}