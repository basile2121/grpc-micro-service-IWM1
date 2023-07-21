import { Inject, Injectable } from '@nestjs/common';
import { Shop } from '../stubs/shop/shop';
import { PrismaService } from '../prisma.service';
import { GetProductRequest, GetProductResponse, PRODUCT_CR_UD_SERVICE_NAME, PRODUCT_PACKAGE_NAME, ProductCRUDServiceClient } from 'src/stubs/product/product';
import { ClientGrpc } from '@nestjs/microservices';
import {firstValueFrom} from "rxjs";
import {Prisma} from "@prisma/client";

@Injectable()
export class ShopService {
  private productService: ProductCRUDServiceClient;
  constructor(@Inject(PRODUCT_CR_UD_SERVICE_NAME) private client: ClientGrpc, private prisma: PrismaService) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductCRUDServiceClient>(PRODUCT_CR_UD_SERVICE_NAME);
  }

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
  async createShopProduct(params: {where: Prisma.ShopWhereUniqueInput, data: Prisma.ShopUpdateInput}): Promise<Shop> {
    const { data, where } = params
    const shop = await this.prisma.shop.update({
      data,
      where,
    })
    return shop
  }

  async findProduct(req: GetProductRequest): Promise<GetProductResponse> {
    const res: GetProductResponse = await firstValueFrom(
      this.productService.getProduct(req) as any,
    );
    return { products: res.products};
  }
}