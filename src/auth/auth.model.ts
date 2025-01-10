import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthContoller } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModel } from "src/entities/admin.entity";
import { JwtModule } from "@nestjs/jwt";
import { Pantry } from "src/entities/pantry.enetity";
import { Delivery } from "src/entities/delivery.entity";

@Module({
    imports:[TypeOrmModule.forFeature([AdminModel,Pantry,Delivery]),
    JwtModule.register({
        secret: 'Secretsarealwaysnice', // Replace with your secret key
        signOptions: { expiresIn: '1h' }, // Set token expiration
      }),
    ],
    controllers:[AuthContoller],
    providers:[AuthService],
})

export class AuthModule{};