import { Injectable } from '@nestjs/common';
import { ShopProduct } from '../../stubs/shop_product/shop_product';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ShopProductService {
  constructor(private prisma: PrismaService) {}

  async shop_product(
    ShopProductWhereUniqueInput: Prisma.ShopProductWhereUniqueInput,
  ): Promise<ShopProduct | null> {
    return this.prisma.shopProduct.findUnique({
      where: ShopProductWhereUniqueInput,
    });
  }

  async shop_products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShopProductWhereUniqueInput;
    where?: Prisma.ShopProductWhereInput;
    orderBy?: Prisma.ShopProductOrderByWithRelationInput;
  }): Promise<ShopProduct[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shopProduct.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createShopProduct(data: Prisma.ShopProductCreateInput): Promise<ShopProduct> {
    return this.prisma.shopProduct.create({
      data,
    });
  }

  async updateShopProduct(params: {
    where: Prisma.ShopProductWhereUniqueInput;
    data: Prisma.ShopProductUpdateInput;
  }): Promise<ShopProduct> {
    const { data, where } = params;
    return this.prisma.shopProduct.update({
      data,
      where,
    });
  }

  async deleteShopProduct(where: Prisma.ShopProductWhereUniqueInput): Promise<ShopProduct> {
    return this.prisma.shopProduct.delete({
      where,
    });
  }
  
}