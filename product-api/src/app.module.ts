import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {grpcConfig} from "./grpc.config";
import {ProductModule } from "./product/product.module";

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}