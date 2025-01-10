import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Diet } from "src/entities/diet.entity";
import { Patients } from "src/entities/patients.entity";
import { DataSource, Repository } from "typeorm";
import { PatientsDto } from "./admin.dto";
import { DietDto } from "src/entities/diet.dto";
import { Pantry } from "src/entities/pantry.enetity";
import { PantryDto } from "src/entities/pantry.dto";
import * as bcrypt from 'bcrypt'
import { PatientPantry } from "src/entities/patientpantry.entity";
import { AdminModel } from "src/entities/admin.entity";

@Injectable()
export class AdminService {
    constructor(
        private dataSource: DataSource,

        @InjectRepository(AdminModel)
        private adminRepo:Repository<AdminModel>,

        @InjectRepository(PatientPantry)
        private patientPantry:Repository<PatientPantry>,

        @InjectRepository(Patients)
        private patientRepository: Repository<Patients>,  // Correctly injected

        @InjectRepository(Diet)
        private dietRepository: Repository<Diet>,         // Correctly injecte

        @InjectRepository(Pantry)
        private pantryRepository: Repository<Pantry>
    ) { }



    async addPaitents(patientsdto: PatientsDto) {
        try {
            const newPatient = this.patientRepository.create(patientsdto);
            const savedPatient = await this.patientRepository.save(newPatient);
            return { result: savedPatient };
        } catch (error) {
            console.error('Error saving patient:', error);
            throw error;
        }
    }

    async addDiet(dietDto:any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const dinner = {
            "diet": dietDto.dinner,
            "patientid": dietDto.patientId,
            "type": "dinner",
        }
        const breakfast = {
            "diet": dietDto.breakfast,
            "patientid": dietDto.patientId,
            "type": "dinner",
        }
        const lunch = {
            "diet": dietDto.lunch,
            "patientid": dietDto.patientId,
            "type": "dinner",
        }
        try {
            await queryRunner.manager.save('Diet', breakfast);
            await queryRunner.manager.save('Diet', lunch);
            await queryRunner.manager.save('Diet', dinner);
            await queryRunner.commitTransaction();
            return { result: "Diet created Successfully" };
        } catch (error) {
            console.error("Error saving diet", error);
            throw error;
        }
    }


    async getPatients() {
        let result = await this.patientRepository.find();
        return { result: result };

    }


    async deletePatient(id) {
        try {
            await this.dietRepository.delete({ patientid: id });
            let result = await this.patientRepository.delete({ id: id });
            return ({ "result": result });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getdiet(id){
        try{
            return await this.dietRepository.find({ where: { patientid: id } })
        }catch(e){
            console.log(e);
            throw e;
        }
    }


    // pantry services

    async addPantry(pantryDto: PantryDto) {
        const hash = await bcrypt.hash(pantryDto.password,10);
        pantryDto.password = hash;
        try {
            const pantry = this.pantryRepository.create(pantryDto);
            const result = await this.pantryRepository.save(pantry);
            return { "result": result };
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async getPantry() {
        try {
            return await this.pantryRepository.find();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deletePantry(id) {
        try {
            const result = await this.pantryRepository.delete({ id: id });
            return ({ "result": result });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async assignPatientPantry(patientPantry){
        try{
            const patient = this.patientPantry.create(patientPantry);
            const result = await this.patientPantry.save(patient);
            return {"result":result}
        }catch(e){
            console.log(e);
            throw e;
        }
    }
}