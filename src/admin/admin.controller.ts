import { Controller,Get,Body, Post, Delete, Param } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { PatientsDto } from "./admin.dto";
import { DietDto } from "src/entities/diet.dto";
import { PantryDto } from "src/entities/pantry.dto";
import { PatientPantry } from "src/entities/patientpantry.entity";
import { AdminDto,LoginDTO } from "src/entities/admin.dto";


@Controller('/admin')
export class AdminController{
    constructor(private adminService:AdminService){}

    @Get()
    helloAdmin(){
        return "Hello from admin"
    }

    @Get('/getpatient')
    async getPatients(){
        return this.adminService.getPatients();
    }

    @Post("/addpatients")
    async addPatients(@Body() patientDto:PatientsDto ):Promise<any>{
        console.log(patientDto)
        return this.adminService.addPaitents(patientDto);
    }

    @Post("/adddiet")
    async addDiet(@Body()diet:any){
        return this.adminService.addDiet(diet)
    }


    @Delete('/deletepatient/:id')
    async deletepatient(@Param('id') id:string){
        return this.adminService.deletePatient(id);
    }

    @Get("/getdiet/:id")
    async getdiet(@Param('id') id:string){
        return this.adminService.getdiet(id)
    }


    // pantry
    @Post("/addpantry")
    async addPantry(@Body() pantryDto:PantryDto){
        return this.adminService.addPantry(pantryDto);
    }

    @Get("/getpantry")
    async getpantry(){
        return this.adminService.getPantry();
    }

    @Delete('/deltepantry/:id')
    async deletepantry(@Param('id') id:string){
        console.log(id)
        return this.adminService.deletePantry(id);
    }
    

    // assign patient & pantry
    @Post("/assignpatientPantry")
    async assignpatient(@Body() patinetPantry:PatientPantry){
        return this.adminService.assignPatientPantry(patinetPantry)
    }
}