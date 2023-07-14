import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {grpcConfig} from "./grpc.config";
import {ShopModule } from "./shop/shop.module";
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ShopService } from './shop/service/shop.service';

const envSchema = Joi.object({
  PRODUCT_API_URL: Joi.string().required(),
  PORT: Joi.number().default(3010)
});

@Module({
  imports: [
    GrpcReflectionModule.register(grpcConfig),
    ShopModule,
    ConfigModule.forRoot({
    ignoreEnvFile: process.env.NODE_ENV === 'production',
    validationSchema: envSchema,
  })
],
  controllers: [AppController],
  providers: [AppService, ShopService],
})

export class AppModule {}