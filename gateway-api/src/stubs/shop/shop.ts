/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "shop";

export interface Shop {
  id?: number | undefined;
  name?: string | undefined;
  address?: string | undefined;
  productId?: number | undefined;
}

export interface GetShopRequest {
  id?: number | undefined;
  name?: string | undefined;
  address?: string | undefined;
}

export interface GetShopResponse {
  shops?: Shop[] | undefined;
}

export interface AddShopRequest {
  name?: string | undefined;
  address?: string | undefined;
}

export interface AddShopResponse {
  shop?: Shop | undefined;
}

export interface UpdateShopRequest {
  id?: number | undefined;
  name?: string | undefined;
  address?: string | undefined;
}

export interface UpdateShopResponse {
  shop?: Shop | undefined;
}

export interface DeleteShopRequest {
  id?: number | undefined;
}

export interface DeleteShopResponse {
  shop?: Shop | undefined;
}

export interface AddShopProductRequest {
  id?: number | undefined;
  productId?: number | undefined;
}

export interface AddShopProductResponse {
  shop?: Shop | undefined;
}

export const SHOP_PACKAGE_NAME = "shop";

export interface ShopCRUDServiceClient {
  getShop(request: GetShopRequest, metadata?: Metadata): Observable<GetShopResponse>;

  addShop(request: AddShopRequest, metadata?: Metadata): Observable<AddShopResponse>;

  updateShop(request: UpdateShopRequest, metadata?: Metadata): Observable<UpdateShopResponse>;

  deleteShop(request: DeleteShopRequest, metadata?: Metadata): Observable<DeleteShopResponse>;

  addShopProduct(request: AddShopProductRequest, metadata?: Metadata): Observable<AddShopProductResponse>;
}

export interface ShopCRUDServiceController {
  getShop(
    request: GetShopRequest,
    metadata?: Metadata,
  ): Promise<GetShopResponse> | Observable<GetShopResponse> | GetShopResponse;

  addShop(
    request: AddShopRequest,
    metadata?: Metadata,
  ): Promise<AddShopResponse> | Observable<AddShopResponse> | AddShopResponse;

  updateShop(
    request: UpdateShopRequest,
    metadata?: Metadata,
  ): Promise<UpdateShopResponse> | Observable<UpdateShopResponse> | UpdateShopResponse;

  deleteShop(
    request: DeleteShopRequest,
    metadata?: Metadata,
  ): Promise<DeleteShopResponse> | Observable<DeleteShopResponse> | DeleteShopResponse;

  addShopProduct(
    request: AddShopProductRequest,
    metadata?: Metadata,
  ): Promise<AddShopProductResponse> | Observable<AddShopProductResponse> | AddShopProductResponse;
}

export function ShopCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getShop", "addShop", "updateShop", "deleteShop", "addShopProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ShopCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ShopCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SHOP_CR_UD_SERVICE_NAME = "ShopCRUDService";
