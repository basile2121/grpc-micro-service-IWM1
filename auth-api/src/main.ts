import './config/tracing';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import grpcOption from './grpc.option';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {HttpExceptionFilter} from "./filter/http-exception.filter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const cs = app.get(ConfigService);
  app.connectMicroservice(grpcOption(cs));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.startAllMicroservices();

  const healthCheckPort = cs.get('HEALTH_PORT');
  await app.listen(healthCheckPort);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  (async () => {
    logger.log(
      `${cs.get('npm_package_name')}:${cs.get(
        'npm_package_version',
      )} Listening ${
        !cs.get<boolean>('insecure') ? 'securely' : 'insecurely'
      } on port ${cs.get('PORT')}`,
    );
    logger.log(`Health checks on port ${healthCheckPort}`);
    logger.log('Server started at ' + new Date());
  })();
}
bootstrap();
