import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Patients{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar',nullable:false})
    pname:string;

    @Column({type:'varchar',nullable:false})
    dname:string;

    @Column({type:'varchar',nullable:false})
    allergies:string;

    @Column({type:'varchar',nullable:false})
    room:string;

    @Column({type:'varchar',nullable:false})
    bedno:string;

    @Column({type:'varchar',nullable:false})
    floor:string;
    
    @Column({type:'int',nullable:false})
    age:number;

    @Column({type:'varchar',nullable:false})
    select:string;

    @Column({type:'varchar',nullable:false})
    contact:string;

    @Column({type:'varchar',nullable:false})
    emrcontact:string;

    @Column({type:'boolean',nullable:false,default:false})
    hasdischared:boolean;

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;

    // each patient can have only one pantry
}