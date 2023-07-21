import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import grpcOption from './grpc.option';
import {MicroserviceOptions} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cs = app.get(ConfigService);
  app.connectMicroservice(grpcOption(cs));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.startAllMicroservices();
}
bootstrap();