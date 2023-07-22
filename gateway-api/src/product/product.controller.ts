import {Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get, Delete, Put} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    AddProductRequest,
    AddProductResponse,
    DeleteProductRequest,
    DeleteProductResponse,
    GetProductRequest,
    GetProductResponse,
    PRODUCT_CR_UD_SERVICE_NAME,
    ProductCRUDServiceClient,
    UpdateProductRequest,
    UpdateProductResponse
} from '../stubs/product/product';
import { Request } from 'express';
import {AuthGuard} from "../auth/auth.guard";

@Controller('product')
export class ProductController implements OnModuleInit {
    private svc: ProductCRUDServiceClient;

    @Inject(PRODUCT_CR_UD_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<ProductCRUDServiceClient>(PRODUCT_CR_UD_SERVICE_NAME);
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createProduct(@Req() req: Request): Promise<Observable<AddProductResponse>> {
        const body: AddProductRequest = req.body;

        return this.svc.addProduct(body);
    }

    @Get()
    @UseGuards(AuthGuard)
    private async getProducts(@Req() req: Request): Promise<Observable<GetProductResponse>> {
        const body: GetProductRequest = req.body;

        return this.svc.getProduct(body);
    }

    @Put()
    @UseGuards(AuthGuard)
    private async updateProduct(@Req() req: Request): Promise<Observable<UpdateProductResponse>> {
        const body: UpdateProductRequest = req.body;

        return this.svc.updateProduct(body);
    }

    @Delete()
    @UseGuards(AuthGuard)
    private async deleteProduct(@Req() req: Request): Promise<Observable<DeleteProductResponse>> {
        const body: DeleteProductRequest = req.body;

        return this.svc.deleteProduct(body);
    }
}