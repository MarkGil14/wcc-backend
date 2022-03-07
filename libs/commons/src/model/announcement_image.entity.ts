import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('announcement_image')
export class AnnouncementImage extends CustomBaseEntity {

    
    @PrimaryGeneratedColumn({
    })
    id: number;



     

    @Column({
        nullable: false
    })
    AnnouncementID : number;



    @Column()
    ImageUrl : string;





}