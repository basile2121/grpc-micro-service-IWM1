import { Module } from '@nestjs/common';
import {ProductController} from "./controller/product.controller";
import {ProductService} from "./service/product.service";
import {PrismaService} from "../prisma.service";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, PrismaService],
})
export class ProductModule {}