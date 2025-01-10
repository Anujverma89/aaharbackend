import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patients } from "src/entities/patients.entity";
import { Diet } from "src/entities/diet.entity";
import { Pantry } from "src/entities/pantry.enetity";
import { PatientPantry } from "src/entities/patientpantry.entity";
import { AdminModel } from "src/entities/admin.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Patients,Diet,Pantry,PatientPantry,AdminModel])],
    controllers:[AdminController],
    providers:[AdminService],
})

export class AdminModule{};