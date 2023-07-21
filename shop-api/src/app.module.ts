import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import grpcOption, {useProductGrpcOptions} from './grpc.option';
import {ShopModule } from "./shop/shop.module";
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from 'joi';
import { ShopService } from './shop/shop.service';
import {ClientsModule} from "@nestjs/microservices";
import {PRODUCT_CR_UD_SERVICE_NAME, PRODUCT_PACKAGE_NAME} from "./stubs/product/product";
import {PrismaService} from "./prisma.service";

const envSchema = Joi.object({
  PRODUCT_API_URL: Joi.string().required(),
  PORT: Joi.number().default(3009)
});

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
    ClientsModule.registerAsync([
      {
        name: PRODUCT_CR_UD_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => useProductGrpcOptions(cs),
      },
    ]),
],
  controllers: [AppController],
  providers: [AppService, ShopService, PrismaService],
})

export class AppModule {}