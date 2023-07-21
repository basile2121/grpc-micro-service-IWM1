import { Controller, Delete, Post } from '@nestjs/common';
import { ProductService } from './product.service';
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
} from '../stubs/product/product';
import { Product } from '../stubs/product/product';
import {Metadata, status} from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import {RpcException} from "@nestjs/microservices";

@Controller()
@ProductCRUDServiceControllerMethods()
export class ProductController implements ProductCRUDServiceController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  async addProduct(
    request: AddProductRequest,
    metadata?: Metadata,
  ): Promise<AddProductResponse> {
    const product = await this.ProductService.createProduct(request as any);
    // new RpcException({message: 'Test', code: status.NOT_FOUND})
    return { product };
  }

  @Delete()
  async deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Promise<DeleteProductResponse> {
    const product = await this.ProductService.deleteProduct({ id: request.id });

    return { product };
  }

  async getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Promise<GetProductResponse> {
    const products: Product[] = await this.ProductService.products({});
    return { products: products };
  }

  async updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Promise<UpdateProductResponse> {
    const product: Product = await this.ProductService.updateProduct({
      where: { id: Number(request.id) },
      data: request,
    });
    return { product };
  }
}
