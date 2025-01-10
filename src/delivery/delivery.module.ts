import { Module } from "@nestjs/common";
import { DeliveryController } from "./delivery.controller";
import { DeliverService } from "./deliver.service";

@Module({
    controllers:[DeliveryController],
    providers:[DeliverService],
})

export class DeliverModule{}