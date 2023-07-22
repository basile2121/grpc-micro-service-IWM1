import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddShopProductRequest, AddShopProductResponse,
  AddShopRequest,
  AddShopResponse,
  DeleteShopRequest,
  DeleteShopResponse, GetShopRequest, GetShopResponse, Shop,
  ShopCRUDServiceController, ShopCRUDServiceControllerMethods, UpdateShopRequest, UpdateShopResponse
} from "./stubs/shop/shop";
import {Metadata, status} from "@grpc/grpc-js";
import {RpcException} from "@nestjs/microservices";

@Controller()
@ShopCRUDServiceControllerMethods()
export class AppController implements ShopCRUDServiceController {
  constructor(private readonly ShopService: AppService) {}

  async addShop(
      request: AddShopRequest,
      metadata?: Metadata,
  ): Promise<AddShopResponse> {
    try{
      const shop = await this.ShopService.createShop(request as any);
      return { shop };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }

  async deleteShop(
      request: DeleteShopRequest,
      metadata?: Metadata,
  ): Promise<DeleteShopResponse> {
    try{
      const shop = await this.ShopService.deleteShop({ id: request.id });
      return { shop };
    } catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }

  }
  async getShop(
      request: GetShopRequest,
      metadata?: Metadata,
  ): Promise<GetShopResponse> {
    try {
      Object.keys(request).forEach((key) => request[key] === '' && delete request[key]);
      const where = {
        ...request,
        id: request.id ? +request.id : undefined,
      };

      return {shops : (await this.ShopService.shops({ where })) as Shop[] }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateShop(
      request: UpdateShopRequest,
      metadata?: Metadata,
  ): Promise<UpdateShopResponse> {
    try{
      const shop: Shop = await this.ShopService.updateShop({
        where: { id: Number(request.id) },
        data: request,
      });
      return { shop };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }

  async addShopProduct(
      request: AddShopProductRequest,
      metadata?: Metadata,
  ): Promise<AddShopProductResponse> {
    const product = await this.ShopService.findProduct(
        {
          id: Number(request.productId),
          name: undefined,
          code: undefined,
        },
    );

    if (!product)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Product not found',
      });

    try{
      const shop: Shop = await this.ShopService.createShopProduct({
        where: { id: Number(request.id) },
        data: { productId: Number(request.productId) },
      });
      return { shop };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }
}
