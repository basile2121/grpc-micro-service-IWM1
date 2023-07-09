import { Module } from '@nestjs/common';
import {ShopProductController} from "./controller/shop_product.controller";
import {ShopProductService} from "./service/shop_product.service";
import {PrismaService} from "../prisma.service";

@Module({
    imports: [],
    controllers: [ShopProductController],
    providers: [ShopProductService, PrismaService],
})
export class ShopModule {}