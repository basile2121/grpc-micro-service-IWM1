import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {grpcConfig} from "./grpc.config";
import {ShopModule } from "./shop/shop.module";

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), ShopModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}