import { Module } from '@nestjs/common';
import { PantryModule } from './pantry/pantry.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { DeliverModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.model';
require("dotenv").config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities:true,
    }),
    PantryModule,AdminModule,DeliverModule,AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
