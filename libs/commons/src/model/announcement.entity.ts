import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('announcement')
export class Announcement extends CustomBaseEntity {

    
    @PrimaryGeneratedColumn({
    })
    id: number;


 

    @Column({
        nullable: false
    })
    Title : string;




    @Column({
        nullable: true
    })
    Description : string;    




    @Column({
        nullable: true
    })
    Location : string;    




    @Column({
        nullable: true
    })
    Author : string;    




    @Column({
        nullable: true
    })
    DatePublish : Date;    
 

    // @Column({
    //     nullable: true
    // })
    // Active : boolean;    

 
}