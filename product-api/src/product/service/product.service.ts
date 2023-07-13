import { Injectable } from '@nestjs/common';
import { Product } from '../../stubs/product/product';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { RpcException } from '@nestjs/microservices';
import { CustomException } from '../custom.exception';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async product(
    ProductWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: ProductWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    return await this.prisma.product.update({
      data,
      where,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return await this.prisma.product.delete({
      where,
    });
  }
}
