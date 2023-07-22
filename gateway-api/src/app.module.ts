import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {ShopModule} from "./shop/shop.module";
import * as Joi from 'joi'
import {ConfigModule} from "@nestjs/config";

const envSchema = Joi.object({
    USER_API_URL: Joi.string().required(),
    PRODUCT_API_URL: Joi.string().required(),
    SHOP_API_URL: Joi.string().required(),
    AUTH_API_URL: Joi.string().required(),
});


@Module({
  imports: [
      ConfigModule.forRoot({
          ignoreEnvFile: process.env.NODE_ENV === 'production',
          validationSchema: envSchema,
      }),
      AuthModule,
      UserModule,
      ProductModule,
      ShopModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
