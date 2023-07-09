import { Controller, Delete, Post, Get, Put } from '@nestjs/common';
import { ShopProductService } from '../service/shop_product.service';
import {
  AddShopProductRequest,
  AddShopProductResponse,
  DeleteShopProductRequest,
  DeleteShopProductResponse,
  GetShopProductRequest,
  GetShopProductResponse,
  ShopProductCRUDServiceController,
  ShopProductCRUDServiceControllerMethods,
  UpdateShopProductRequest,
  UpdateShopProductResponse,
} from '../../stubs/shop_product/shop_product';
import { Product } from '../../stubs/product/product';
import {Metadata, status} from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import {RpcException} from "@nestjs/microservices";

@Controller()
@ShopProductCRUDServiceControllerMethods()
export class ShopProductController implements ShopProductCRUDServiceController {
  constructor(private readonly ShopProductService: ShopProductService) {}

    @Post()
    async addShopProduct(
        request: AddShopProductRequest,
        metadata?: Metadata,
    ): Promise<AddShopProductResponse> {
        try{
            const shopProduct = await this.ShopProductService.createShopProduct(request as any);
            return { shopProduct };
        }catch(e){
            throw new RpcException({message: e.message, code: status.NOT_FOUND})
        }
    }

    @Delete()
    async deleteShopProduct(
        request: DeleteShopProductRequest,
        metadata?: Metadata,
    ): Promise<DeleteShopProductResponse> {
        try{
            const shopProduct = await this.ShopProductService.deleteShopProduct({ id: request.id });
            return { shopProduct };
        }catch(e){
            throw new RpcException({message: e.message, code: status.NOT_FOUND})
        }
    }

    @Get()
    async getShopProduct(
        request: GetShopProductRequest,
        metadata?: Metadata,
    ): Promise<GetShopProductResponse> {
        const shopProducts: Product[] = await this.ShopProductService.shop_products({});
        return { shopProduct: shopProducts };
    }

    @Put()
    async updateShopProduct(
        request: UpdateShopProductRequest,
        metadata?: Metadata,
    ): Promise<UpdateShopProductResponse> {
        try{
            const shopProduct = await this.ShopProductService.updateShopProduct(request as any);
            return { shopProduct };
        }catch(e){
            throw new RpcException({message: e.message, code: status.NOT_FOUND})
        }
    }
}