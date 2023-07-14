import {Global, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {AUTH_PACKAGE_NAME} from '../stubs/auth/auth';
import { AuthController } from './auth.controller';
import {ConfigService} from "@nestjs/config";
import {authGrpcOptions} from "../config/grpc.option";
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: AUTH_PACKAGE_NAME,
        useFactory: () => authGrpcOptions(),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
