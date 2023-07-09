/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "shop";

export interface ShopProduct {
  id?: number;
  shopId?: number;
  productId?: number;
}

export interface AddShopProductRequest {
  shopId?: number;
  productId?: number;
}

export interface AddShopProductResponse {
  shopProduct?: ShopProduct;
}

export interface GetShopProductRequest {
  id?: number;
}

export interface GetShopProductResponse {
  shopProduct?: ShopProduct[];
}

export interface UpdateShopProductRequest {
  id?: number;
  shopId?: number;
  productId?: number;
}

export interface UpdateShopProductResponse {
  shopProduct?: ShopProduct;
}

export interface DeleteShopProductRequest {
  id?: number;
}

export interface DeleteShopProductResponse {
  shopProduct?: ShopProduct;
}

export const SHOP_PACKAGE_NAME = "shop";

export interface ShopProductCRUDServiceClient {
  addShopProduct(request: AddShopProductRequest, metadata?: Metadata): Observable<AddShopProductResponse>;

  getShopProduct(request: GetShopProductRequest, metadata?: Metadata): Observable<GetShopProductResponse>;

  updateShopProduct(request: UpdateShopProductRequest, metadata?: Metadata): Observable<UpdateShopProductResponse>;

  deleteShopProduct(request: DeleteShopProductRequest, metadata?: Metadata): Observable<DeleteShopProductResponse>;
}

export interface ShopProductCRUDServiceController {
  addShopProduct(
    request: AddShopProductRequest,
    metadata?: Metadata,
  ): Promise<AddShopProductResponse> | Observable<AddShopProductResponse> | AddShopProductResponse;

  getShopProduct(
    request: GetShopProductRequest,
    metadata?: Metadata,
  ): Promise<GetShopProductResponse> | Observable<GetShopProductResponse> | GetShopProductResponse;

  updateShopProduct(
    request: UpdateShopProductRequest,
    metadata?: Metadata,
  ): Promise<UpdateShopProductResponse> | Observable<UpdateShopProductResponse> | UpdateShopProductResponse;

  deleteShopProduct(
    request: DeleteShopProductRequest,
    metadata?: Metadata,
  ): Promise<DeleteShopProductResponse> | Observable<DeleteShopProductResponse> | DeleteShopProductResponse;
}

export function ShopProductCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addShopProduct", "getShopProduct", "updateShopProduct", "deleteShopProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ShopProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ShopProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SHOP_PRODUCT_CR_UD_SERVICE_NAME = "ShopProductCRUDService";
