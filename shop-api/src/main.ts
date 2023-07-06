import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcConfig } from './grpc.config';
import {MicroserviceOptions} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      grpcConfig,
  );
  await app.listen();
}
bootstrap();