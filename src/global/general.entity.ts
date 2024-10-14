import { BaseEntity, Column, CreateDateColumn } from "typeorm";

export class ModelEntity extends BaseEntity{

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;
}