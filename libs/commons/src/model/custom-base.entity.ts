import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";



export abstract class CustomBaseEntity  extends BaseEntity {

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true,
      })
      isActive: boolean;
    
      @CreateDateColumn({ name: 'created_at' })
      createdAt?: Date;
    
      @Column({ name: 'created_by' })
      createdBy?: string;
    
      @UpdateDateColumn({ name: 'updated_at'})
      updatedAt?: Date;
    
      @Column({ name: 'updated_by' })
      updatedBy?: string;
    
      @DeleteDateColumn({ name: 'deleted_at' })
      deleted?: Date;
    
      @VersionColumn({ name: 'version_id' })
      versionId: number;
    
    
  }