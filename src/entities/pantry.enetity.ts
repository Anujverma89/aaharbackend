import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pantry{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar',nullable:false})
    staffname:string;

    @Column({type:'varchar',nullable:false})
    contact:string;

    @Column({type:'varchar',nullable:false})
    location:string;

    @Column({type:'varchar',nullable:false})
    email:string;

    @Column({type:'varchar',nullable:false})
    password:string

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;

}