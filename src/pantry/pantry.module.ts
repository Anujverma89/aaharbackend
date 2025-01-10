import { Module } from "@nestjs/common";
import { PantryController } from "./pantry.controller";
import { PantryServices } from "./pantry.servce";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Delivery } from "src/entities/delivery.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Delivery])],
    controllers:[PantryController],
    providers:[PantryServices],
    exports:[],

})

export class PantryModule{}