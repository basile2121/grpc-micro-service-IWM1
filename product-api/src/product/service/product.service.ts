import { Injectable } from '@nestjs/common';
import { Product } from '../../stubs/product/product';
import { Prisma } from '@prisma/client';
import {PrismaService} from "../../prisma.service";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    findAll(): Promise<Product[]> {
        return this.prisma.Product.findMany();
    }

    findById(id: number): Promise<Product> {
        return this.prisma.Product.findUnique({
            where: { id },
        });
    }

    findByName(name: string): Promise<Product> {
        return this.prisma.Product.findUnique({
            where: { name },
        });
    }

    create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.Product.create({ data });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.Product.update({
            where: { id },
            data,
        });
    }

    delete(id: number): Promise<Product> {
        return this.prisma.Product.delete({
            where: { id },
        });
    }
}