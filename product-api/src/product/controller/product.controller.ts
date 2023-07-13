import { Controller, Delete, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import {
  AddProductRequest,
  AddProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ProductCRUDServiceController,
  ProductCRUDServiceControllerMethods,
  UpdateProductRequest,
  UpdateProductResponse,
} from '../../stubs/product/product';
import { Product } from '../../stubs/product/product';
import { Metadata, status } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller()
@ProductCRUDServiceControllerMethods()
export class ProductController implements ProductCRUDServiceController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  async addProduct(
    request: AddProductRequest,
    metadata?: Metadata,
  ): Promise<AddProductResponse> {
    try {
      const product = await this.ProductService.createProduct(request as any);
      return { product };
    } catch (error) {
      throw new RpcException({
        message: 'No name provided',
        code: HttpStatus.BAD_REQUEST,
        status: status.INVALID_ARGUMENT,
      });
    }
    // new RpcException({message: 'Test', code: status.NOT_FOUND})
  }

  @Delete()
  async deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Promise<DeleteProductResponse> {
    try {
      const product = await this.ProductService.deleteProduct({
        id: request.id,
      });

      return { product };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Promise<GetProductResponse> {
    try {
      const products: Product[] = await this.ProductService.products({});
      return { products: products };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Promise<UpdateProductResponse> {
    try {
      const product: Product = await this.ProductService.updateProduct({
        where: { id: Number(request.id) },
        data: request,
      });
      return { product };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
