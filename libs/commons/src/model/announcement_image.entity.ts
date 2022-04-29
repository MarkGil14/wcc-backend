import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Announcement } from './announcement.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('announcement_image')
export class AnnouncementImage extends CustomBaseEntity {

    
    @PrimaryGeneratedColumn({
    })
    id: number;



     

    @Column({
        nullable: false
    })
    announcementId : number;



    @Column({
        nullable: true
    })
    ImageUrl : string;




    @ManyToOne(() => Announcement, announcement => announcement.announcement_images)
    announcement : Announcement;

 

}