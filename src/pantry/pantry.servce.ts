import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Delivery } from "src/entities/delivery.entity";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

@Injectable()
export class PantryServices{

    constructor(
        private dataSource :DataSource,
        @InjectRepository(Delivery)
        private deliveryRepo:Repository<Delivery>,
    ){}

    getPantry(){
        return {"name":"ANujv", "contact":"9696714438"}
    }

    async savePartner(deliveryDto){
        const has = await bcrypt.hash(deliveryDto.password,10);
        deliveryDto.password = has;
        try{
            const vahak = this.deliveryRepo.create(deliveryDto);
            const reuslt = this.deliveryRepo.save(vahak);
            return reuslt;
        }catch(e){
            console.log(e);
            throw e;
        }
    }
}