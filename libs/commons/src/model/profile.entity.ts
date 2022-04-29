import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { JobProfile } from '.';
import { Account } from './account.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('profile')
export class Profile extends CustomBaseEntity {

    
    @PrimaryColumn({
        type : 'real'
    })
    id: number;



    @Column({
        nullable: false,
        unique : true
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
        nullable: true
    })
    MiddleName : string;


    @Column({
        nullable: true
    })
    Gender : string;


    @Column({
        nullable: true
    })
    BirthDate : Date;



    @Column({
        nullable: true
    })
    Avatar : string;



    @OneToOne(() => Account, account => account.profile) // specify inverse side as a second parameter
    account : Account;




    @OneToMany(() => JobProfile, job_profile => job_profile.profile)    
    @JoinColumn({name: 'id', referencedColumnName: 'profileId'})
    job_profiles : JobProfile[];
    

    

}