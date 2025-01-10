import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminModel } from "src/entities/admin.entity";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Pantry } from "src/entities/pantry.enetity";
import { Delivery } from "src/entities/delivery.entity";


@Injectable()
export class AuthService{
    
    constructor(
        private dataSource: DataSource,

        private readonly jwtService: JwtService,

        @InjectRepository(AdminModel)
        private adminRepo:Repository<AdminModel>,

        @InjectRepository(Pantry)
        private pantryRepository:Repository<Pantry>,

        @InjectRepository(Delivery)
        private deliveryRepo:Repository<Delivery>,
    ){}

    async handlerequest(adminDTO){
        const has = await bcrypt.hash(adminDTO.password,10);
        adminDTO.password = has;
        try{
            const adm = this.adminRepo.create(adminDTO);
            return await this.adminRepo.save(adm);
        }catch(e){
            console.log(e)
            throw e;
        }
    }


    async login(adminDTO){
        if(adminDTO.role === "Delivery"){
         
            const user = await this.deliveryRepo.find({where:{email:adminDTO.email}});
            if(user.length > 0){
                const phash = await bcrypt.compare(adminDTO.password,user[0].password);
                if(phash){
                    return {"user":user,"role":"Delivery","isvalid":1};
                }else{
                    return {"user":null,"isvalid":0};
                }
            }else{
                return {"user":null,"isvalid":0};
            }
        }else if(adminDTO.role === "Admin"){
           
            const user = await this.adminRepo.find({where:{email:adminDTO.email}});
            if(user.length > 0){
                const phash = await bcrypt.compare(adminDTO.password,user[0].password);
                if(phash){
                    return {"user":user, "role":"Admin", "isvalid":1};
                }else{
                    return {"user":null,"isvalid":0};
                }
            }else{
                return {"user":null,"isvalid":0};
            }
        }else if(adminDTO.role === "Pantry"){

            const user = await this.pantryRepository.find({where:{email:adminDTO.email}});
        
            if(user.length > 0){
                const phash = await bcrypt.compare(adminDTO.password,user[0].password);
                if(phash){
                    return {"user":user, "role":"Pantry" ,"isvalid":1};
                }else{
                    return {"user":null,"isvalid":0};
                }
            }else{
                return {"user":null,"isvalid":0};
            }
        }else{
            return {"user":null,"isvalid":0};
        }
    }

    async generateJwt(user: any) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
      }
}