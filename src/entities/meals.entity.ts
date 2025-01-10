import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meals{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    type:string;

    @Column({type:'varchar',nullable:false})
    deliveredStatus:string;

    @Column({type:'varchar',nullable:false})
    pantientid:string;

    @Column({type:'varchar',nullable:false})
    pantryid:string;
    
    @Column({type:'varchar',nullable:false})
    vahakid:string;

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    timecreated:Date;
}