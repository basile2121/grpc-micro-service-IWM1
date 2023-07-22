import {Module} from '@nestjs/common';
import { ProductController } from './product.controller';
import {ClientsModule} from "@nestjs/microservices";
import {productGrpcOptions} from "../grpc.option";
import {PRODUCT_CR_UD_SERVICE_NAME} from "../stubs/product/product";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        imports:[ConfigModule],
        name: PRODUCT_CR_UD_SERVICE_NAME,
        useFactory: (cs: ConfigService) => productGrpcOptions(cs),
      },
    ]),
  ],
  controllers: [ProductController],
})

export class ProductModule {}
