import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar',nullable:false})
    name:string    

    @Column({type:'varchar', nullable:false})
    contact:string

    @Column({type:'varchar',nullable:false})
    email:string

    @Column({type:'varchar',nullable:false})
    password:string

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;
}