import { Body, Controller, Get, Post } from "@nestjs/common";
import { PantryServices } from "./pantry.servce";
import { DeliveryDto } from "src/entities/delivery.dto";

@Controller('pantry')
export class PantryController{
    // injecting the dependency 
    constructor(private pantryService:PantryServices){};

    @Get()
    getPantry(){
       return this.pantryService.getPantry();
    }

    @Post("/addpartner")
    async savePartner(@Body() deliveryDto:DeliveryDto){
        return this.pantryService.savePartner(deliveryDto);
    }
}