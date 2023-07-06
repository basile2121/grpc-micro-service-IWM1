import {
    GrpcOptions,
    Transport,
} from '@nestjs/microservices';
import { SHOP_PACKAGE_NAME } from './stubs/shop/shop';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:3020',
        package: SHOP_PACKAGE_NAME,
        protoPath: join('C:\\Users\\bilal\\\\Documents\\grpc-micro-service-IWM1\\shop-api\\src\\proto\\shop\\shop.proto'),
    },
}) as GrpcOptions;

