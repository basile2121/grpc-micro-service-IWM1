import { Module } from '@nestjs/common';
import {ShopController} from "./controller/shop.controller";
import {ShopService} from "./service/shop.service";
import {PrismaService} from "../prisma.service";

@Module({
    imports: [],
    controllers: [ShopController],
    providers: [ShopService, PrismaService],
})
export class ShopModule {}