import { Controller, Delete, Post } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import {
  AddShopRequest,
  AddShopResponse,
  DeleteShopRequest,
  DeleteShopResponse,
  GetShopRequest,
  GetShopResponse,
  ShopCRUDServiceController,
  ShopCRUDServiceControllerMethods,
  UpdateShopRequest,
  UpdateShopResponse,
} from '../../stubs/shop/shop';
import { Product } from '../../stubs/product/product';
import {Metadata, status} from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import {RpcException} from "@nestjs/microservices";

@Controller()
@ShopCRUDServiceControllerMethods()
export class ShopController implements ShopCRUDServiceController {
  constructor(private readonly ShopService: ShopService) {}

    @Post()
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

    @Delete()
    async deleteShop(
        request: DeleteShopRequest,
        metadata?: Metadata,
    ): Promise<DeleteShopResponse> {
        try{
            const shop = await this.ShopService.deleteShop({ id: request.id });
            return { shop };
        }catch(e){
            throw new RpcException({message: e.message, code: status.NOT_FOUND})
        }

    }

    async getShop(
        request: GetShopRequest,
        metadata?: Metadata,
    ): Promise<GetShopResponse> {
        const shops: Product[] = await this.ShopService.shops({});
        return { shops: shops };
    }

    async updateShop(
        request: UpdateShopRequest,
        metadata?: Metadata,
    ): Promise<UpdateShopResponse> {
        const shop: Product = await this.ShopService.updateShop({
            where: { id: Number(request.id) },
            data: request,
        });
        return { shop };
    }


}