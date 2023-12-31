import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME} from './stubs/auth/auth';
import {USER_PACKAGE_NAME, USER_SERVICE_NAME} from './stubs/user/user';
import {PRODUCT_CR_UD_SERVICE_NAME, PRODUCT_PACKAGE_NAME} from "./stubs/product/product";
import {SHOP_CR_UD_SERVICE_NAME, SHOP_PACKAGE_NAME} from "./stubs/shop/shop";

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
    name: AUTH_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      url: cs.get('AUTH_API_URL'),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: [join(__dirname, 'proto/auth/auth.proto')],
    },
});

export const userGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('USER_API_URL'),
    package: USER_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/user/user.proto')],
  },
});

export const productGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: PRODUCT_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('PRODUCT_API_URL'),
    package: PRODUCT_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/product/product.proto')],
  },
});

export const shopGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: SHOP_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('SHOP_API_URL'),
    package: SHOP_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/shop/shop.proto')],
  },
});
