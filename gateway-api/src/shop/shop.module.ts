import {Module} from '@nestjs/common';
import {ShopController} from './shop.controller';
import {ClientsModule} from "@nestjs/microservices";
import {shopGrpcOptions} from "../grpc.option";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SHOP_CR_UD_SERVICE_NAME} from "../stubs/shop/shop";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        imports:[ConfigModule],
        name: SHOP_CR_UD_SERVICE_NAME,
        useFactory: (cs: ConfigService) => shopGrpcOptions(cs),
      },
    ]),
  ],
  controllers: [ShopController],
})

export class ShopModule {}
