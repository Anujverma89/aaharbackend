import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patients } from "./patients.entity";

@Entity()
export class Diet{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:2000})
    diet:string;

    @Column({type:"varchar",length:2000})
    patientid:string;

    @Column({nullable:false})
    type:string;

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;
    
}