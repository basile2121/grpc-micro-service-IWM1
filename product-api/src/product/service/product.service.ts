import { Injectable } from '@nestjs/common';
import { Product } from '../../stubs/product/product';
import { Prisma } from '@prisma/client';
import {PrismaService} from "../../prisma.service";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    findById(id: number): Promise<Product> {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }

    findByName(name: string): Promise<Product> {
        return this.prisma.product.findUnique({
            where: { name },
        });
    }

    create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({ data });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    delete(id: number): Promise<Product> {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}