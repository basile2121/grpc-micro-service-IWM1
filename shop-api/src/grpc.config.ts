import {
    ClientProviderOptions,
    GrpcOptions,
    Transport,
} from '@nestjs/microservices';
import { SHOP_PACKAGE_NAME } from './stubs/shop/shop';
import { PRODUCT_PACKAGE_NAME } from './stubs/product/product';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { ConfigService } from '@nestjs/config';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:3020',
        package: SHOP_PACKAGE_NAME,
        protoPath: join('C:\\Users\\bilal\\\\Documents\\grpc-micro-service-IWM1\\shop-api\\src\\proto\\shop\\shop.proto'),
    },
}) as GrpcOptions;

export default (cs: ConfigService): GrpcOptions => {
  return addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: SHOP_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT')}`,
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: [join(__dirname, 'proto/shop/shop.proto')],
    },
  });
};

export const productGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: PRODUCT_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('PRODUCT_API_URL'),
    package: PRODUCT_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/product/product.proto')],
    keepalive: {
      // Send keepalive pings every 10 seconds, default is 2 hours.
      keepaliveTimeMs: 10 * 1000,
      // Keepalive ping timeout after 5 seconds, default is 20 seconds.
      keepaliveTimeoutMs: 5 * 1000,
      // Allow keepalive pings when there are no gRPC calls.
      keepalivePermitWithoutCalls: 1,
    }
  },
});