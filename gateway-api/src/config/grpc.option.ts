import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { join } from 'path';
import {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME} from '../stubs/auth/auth';
import {USER_PACKAGE_NAME, USER_SERVICE_NAME} from '../stubs/user/user';
import {PRODUCT_CR_UD_SERVICE_NAME, PRODUCT_PACKAGE_NAME} from "../stubs/product/product";

export const authGrpcOptions = (): ClientProviderOptions => ({
    name: AUTH_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      url: '0.0.0.0:4003',
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: ["C:\\Users\\basil\\Documents\\ESGI - M1\\MicroService\\Controle\\grpc-task-manager_b\\grpc-micro-service-IWM1\\proto\\auth\\auth.proto"],
    },
});

export const userGrpcOptions = (): ClientProviderOptions => ({
  name: USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4002',
    package: USER_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: ["C:\\Users\\basil\\Documents\\ESGI - M1\\MicroService\\Controle\\grpc-task-manager_b\\grpc-micro-service-IWM1\\proto\\user\\user.proto"],
  },
});

export const productGrpcOptions = (): ClientProviderOptions => ({
  name: PRODUCT_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3010',
    package: USER_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: ["C:\\Users\\basil\\Documents\\ESGI - M1\\MicroService\\Controle\\grpc-task-manager_b\\grpc-micro-service-IWM1\\proto\\product\\product.proto"],
  },
});
