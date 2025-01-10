import { Injectable } from "@nestjs/common";

@Injectable()
export class DeliverService{
    getDeliveries(){
        return "this is delivery"
    }
}