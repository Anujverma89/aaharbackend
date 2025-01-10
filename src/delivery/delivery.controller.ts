import { Controller, Get } from "@nestjs/common";
import { DeliverService } from "./deliver.service";

@Controller("deliveries")
export class DeliveryController{
    constructor(private deliverySerive:DeliverService){};

    @Get()
    getDeliveries():string{
        return this.deliverySerive.getDeliveries();
    }
}