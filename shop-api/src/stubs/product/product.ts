/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface Product {
  id?: number | undefined;
  name?: string | undefined;
  code?: number | undefined;
  price?: number | undefined;
  origin?: string | undefined;
}

export interface GetProductRequest {
  id?: number | undefined;
  name?: string | undefined;
  code?: number | undefined;
}

export interface GetProductResponse {
  products?: Product[] | undefined;
}

export interface AddProductRequest {
  name?: string | undefined;
  code?: number | undefined;
  price?: number | undefined;
  origin?: string | undefined;
}

export interface AddProductResponse {
  product?: Product | undefined;
}

export interface UpdateProductRequest {
  id?: number | undefined;
  name?: string | undefined;
  code?: number | undefined;
  price?: number | undefined;
  origin?: string | undefined;
}

export interface UpdateProductResponse {
  product?: Product | undefined;
}

export interface DeleteProductRequest {
  id?: number | undefined;
}

export interface DeleteProductResponse {
  product?: Product | undefined;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductCRUDServiceClient {
  getProduct(request: GetProductRequest, metadata?: Metadata): Observable<GetProductResponse>;

  addProduct(request: AddProductRequest, metadata?: Metadata): Observable<AddProductResponse>;

  updateProduct(request: UpdateProductRequest, metadata?: Metadata): Observable<UpdateProductResponse>;

  deleteProduct(request: DeleteProductRequest, metadata?: Metadata): Observable<DeleteProductResponse>;
}

export interface ProductCRUDServiceController {
  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Promise<GetProductResponse> | Observable<GetProductResponse> | GetProductResponse;

  addProduct(
    request: AddProductRequest,
    metadata?: Metadata,
  ): Promise<AddProductResponse> | Observable<AddProductResponse> | AddProductResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Promise<UpdateProductResponse> | Observable<UpdateProductResponse> | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Promise<DeleteProductResponse> | Observable<DeleteProductResponse> | DeleteProductResponse;
}

export function ProductCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getProduct", "addProduct", "updateProduct", "deleteProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_CR_UD_SERVICE_NAME = "ProductCRUDService";
