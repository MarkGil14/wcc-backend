import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { JobProfile } from '.';
import { Account } from './account.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('profile')
export class Profile extends CustomBaseEntity {

    
    @PrimaryGeneratedColumn({
    })
    id: number;



    @Column({
        nullable: false
    })
    accountId : number;



    @Column({
        nullable: false
    })
    FirstName : string;



    @Column({
        nullable: false
    })
    LastName : string;


    @Column({
        nullable: false
    })
    MiddleName : string;


    @Column({
        nullable: false
    })
    Gender : string;


    @Column({
        nullable: false
    })
    BirthDate : Date;



    @Column({
        nullable: false
    })
    Avatar : string;



    @OneToOne(() => Account, account => account.profile) // specify inverse side as a second parameter
    account : Account;




    @OneToMany(() => JobProfile, job_profile => job_profile.profile)    
    @JoinColumn({name: 'id', referencedColumnName: 'profileId'})
    job_profiles : JobProfile[];
    

    

}