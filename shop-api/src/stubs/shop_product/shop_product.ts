/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "shop_product";

export interface ShopProduct {
  id?: number;
  shopId?: number;
  productId?: number;
}

export const SHOP_PRODUCT_PACKAGE_NAME = "shop_product";

export interface ShopProductCRUDServiceClient {
  addShopProduct(request: ShopProduct, metadata?: Metadata): Observable<ShopProduct>;
}

export interface ShopProductCRUDServiceController {
  addShopProduct(
    request: ShopProduct,
    metadata?: Metadata,
  ): Promise<ShopProduct> | Observable<ShopProduct> | ShopProduct;
}

export function ShopProductCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addShopProduct"];
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
