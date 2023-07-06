import { Injectable } from '@nestjs/common';
import { Shop } from '../../stubs/shop/shop';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}
  async shop(
    ShopWhereUniqueInput: Prisma.ShopWhereUniqueInput,
  ): Promise<Shop | null> {
    return this.prisma.shop.findUnique({
      where: ShopWhereUniqueInput,
    });
  }

  async shops(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShopWhereUniqueInput;
    where?: Prisma.ShopWhereInput;
    orderBy?: Prisma.ShopOrderByWithRelationInput;
  }): Promise<Shop[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shop.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createShop(data: Prisma.ShopCreateInput): Promise<Shop> {
    return this.prisma.shop.create({
      data,
    });
  }

  async updateShop(params: {
    where: Prisma.ShopWhereUniqueInput;
    data: Prisma.ShopUpdateInput;
  }): Promise<Shop> {
    const { data, where } = params;
    return this.prisma.shop.update({
      data,
      where,
    });
  }

  async deleteShop(where: Prisma.ShopWhereUniqueInput): Promise<Shop> {
    return this.prisma.shop.delete({
      where,
    });
  }
}