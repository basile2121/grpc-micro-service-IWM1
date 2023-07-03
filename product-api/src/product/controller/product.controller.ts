import {Controller, Delete, Post} from '@nestjs/common';
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
    UpdateProductResponse
} from '../../stubs/product/product';
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";

@Controller()
@ProductCRUDServiceControllerMethods()
export class ProductController implements ProductCRUDServiceController {
    constructor(private readonly ProductService: ProductService) {

    }

    @Post()
    addProduct(request: AddProductRequest, metadata?: Metadata): Promise<AddProductResponse> | Observable<AddProductResponse> | AddProductResponse {
        return undefined;
    }

    @Delete()
    deleteProduct(request: DeleteProductRequest, metadata?: Metadata): Promise<DeleteProductResponse> | Observable<DeleteProductResponse> | DeleteProductResponse {
        return undefined;
    }

    getProduct(request: GetProductRequest, metadata?: Metadata): Promise<GetProductResponse> | Observable<GetProductResponse> | GetProductResponse {
        return undefined;
    }

    updateProduct(request: UpdateProductRequest, metadata?: Metadata): Promise<UpdateProductResponse> | Observable<UpdateProductResponse> | UpdateProductResponse {
        return undefined;
    }

}