import {Global, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME} from '../stubs/auth/auth';
import { AuthController } from './auth.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {authGrpcOptions} from "../grpc.option";
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        imports:[ConfigModule],
        name: AUTH_SERVICE_NAME,
        useFactory: (cs: ConfigService) => authGrpcOptions(cs),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
