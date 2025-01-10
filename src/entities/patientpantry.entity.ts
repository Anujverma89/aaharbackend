import { Entity ,OneToOne,PrimaryGeneratedColumn,Column} from "typeorm";
import { Patients } from "./patients.entity";
import { Pantry } from "./pantry.enetity";

@Entity()
export class PatientPantry{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:2000})
    patientid:string;
    
    @Column({type:"varchar",length:2000})
    pantryid:string;

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;

}