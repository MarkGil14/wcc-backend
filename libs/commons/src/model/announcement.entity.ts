import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AnnouncementImage } from './announcement_image.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('announcement')
export class Announcement extends CustomBaseEntity {

    
    @PrimaryGeneratedColumn()
    id: string;


 

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
 



    @OneToMany(() => AnnouncementImage, announcement_image => announcement_image.announcement, {  eager: false })    
    @JoinColumn({name: 'id', referencedColumnName: 'announcementId'})
    announcement_images : AnnouncementImage[];
    
 
}