/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "shop";

export interface Shop {
  id?: number;
  name?: string;
  address?: string;
}

export interface GetShopRequest {
  id?: number;
  name?: string;
  address?: string;
}

export interface GetShopResponse {
  shops?: Shop[];
}

export interface AddShopRequest {
  name?: string;
  address?: string;
}

export interface AddShopResponse {
  shop?: Shop;
}

export interface UpdateShopRequest {
  id?: number;
  name?: string;
  address?: string;
}

export interface UpdateShopResponse {
  shop?: Shop;
}

export interface DeleteShopRequest {
  id?: number;
}

export interface DeleteShopResponse {
  shop?: Shop;
}

export const SHOP_PACKAGE_NAME = "shop";

export interface ShopCRUDServiceClient {
  getShop(request: GetShopRequest, metadata?: Metadata): Observable<GetShopResponse>;

  addShop(request: AddShopRequest, metadata?: Metadata): Observable<AddShopResponse>;

  updateShop(request: UpdateShopRequest, metadata?: Metadata): Observable<UpdateShopResponse>;

  deleteShop(request: DeleteShopRequest, metadata?: Metadata): Observable<DeleteShopResponse>;
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
}

export function ShopCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getShop", "addShop", "updateShop", "deleteShop"];
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
