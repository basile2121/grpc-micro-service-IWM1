import { Module } from '@nestjs/common';
import {ShopController} from "./shop.controller";
import {PrismaService} from "../prisma.service";
import {ShopService} from "./shop.service";
import {useProductGrpcOptions} from "../grpc.option";
import {ClientsModule} from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([useProductGrpcOptions])],
    controllers: [ShopController],
    providers: [ShopService, PrismaService],
})
export class ShopModule {}