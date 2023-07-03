import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {grpcConfig} from "./grpc.config";
import {TodoModule} from "./product/product.module";

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}