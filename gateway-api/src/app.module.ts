import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {ShopModule} from "./shop/shop.module";

@Module({
  imports: [
      AuthModule,
      UserModule,
      ProductModule,
      ShopModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
