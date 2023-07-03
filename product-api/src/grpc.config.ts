import {
    GrpcOptions,
    Transport,
} from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME } from './stubs/product/product';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:3010',
        package: PRODUCT_PACKAGE_NAME,
        protoPath: join('C:\\Users\\basil\\OneDrive\\Documents\\IW M1\\grpc-micro-service-IWM1\\product-api\\src\\proto\\product\\product.proto'),
    },
}) as GrpcOptions;

