import { Delete, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddProductRequest,
  AddProductResponse,
  DeleteProductRequest, DeleteProductResponse, GetProductRequest, GetProductResponse, Product,
  ProductCRUDServiceController, ProductCRUDServiceControllerMethods, UpdateProductRequest, UpdateProductResponse
} from "./stubs/product/product";
import {Metadata, status} from "@grpc/grpc-js";
import {RpcException} from "@nestjs/microservices";

@ProductCRUDServiceControllerMethods()
export class AppController  implements ProductCRUDServiceController {
  constructor(private readonly productService: AppService) {}

  @Post()
  async addProduct(
      request: AddProductRequest,
      metadata?: Metadata,
  ): Promise<AddProductResponse> {
    try{
      const product = await this.productService.createProduct(request as any);
      return { product };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }

  @Delete()
  async deleteProduct(
      request: DeleteProductRequest,
      metadata?: Metadata,
  ): Promise<DeleteProductResponse> {
    try{
      const product = await this.productService.deleteProduct({ id: request.id });
      return { product };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }

  async getProduct(
      request: GetProductRequest,
      metadata?: Metadata,
  ): Promise<GetProductResponse> {
      try {
        Object.keys(request).forEach((key) => request[key] === '' && delete request[key]);
        const where = {
          ...request,
          id: request.id ? +request.id : undefined,
        };

        return {products : (await this.productService.products({ where })) as Product[] }
      } catch (error) {
        throw new RpcException(error);
      }
  }

  async updateProduct(
      request: UpdateProductRequest,
      metadata?: Metadata,
  ): Promise<UpdateProductResponse> {
    try{
      const product: Product = await this.productService.updateProduct({
        where: { id: Number(request.id) },
        data: request,
      });
      return { product };
    }catch(e){
      throw new RpcException({message: e.message, code: status.NOT_FOUND})
    }
  }
}