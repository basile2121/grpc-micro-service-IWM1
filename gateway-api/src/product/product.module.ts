import {Module} from '@nestjs/common';
import { ProductController } from './product.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {productGrpcOptions} from "../config/grpc.option";
import { PRODUCT_PACKAGE_NAME} from "../stubs/product/product";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_PACKAGE_NAME,
        useFactory: () => productGrpcOptions(),
      },
    ]),
  ],
  controllers: [ProductController],
})

export class ProductModule {}
