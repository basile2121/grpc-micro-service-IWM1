import {Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get, Delete, Put} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {GrpcAuthGuard} from "../auth/auth.guard";
import {
    AddShopRequest,
    AddShopResponse, DeleteShopRequest, DeleteShopResponse, GetShopRequest,
    GetShopResponse,
    SHOP_CR_UD_SERVICE_NAME, SHOP_PACKAGE_NAME,
    ShopCRUDServiceController, UpdateShopRequest, UpdateShopResponse
} from "../stubs/shop/shop";

@Controller('shop')
export class ShopController implements OnModuleInit {
    private svc: ShopCRUDServiceController;

    @Inject(SHOP_CR_UD_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<ShopCRUDServiceController>(SHOP_CR_UD_SERVICE_NAME);
    }

    @Post()
    @UseGuards(GrpcAuthGuard)
    private async addShop(@Req() req: Request): Promise<AddShopResponse | Observable<AddShopResponse>> {
        const body: AddShopRequest = req.body;

        return this.svc.addShop(body);
    }

    @Get()
    @UseGuards(GrpcAuthGuard)
    private async getShop(@Req() req: Request): Promise<GetShopResponse | Observable<GetShopResponse>> {
        const body: GetShopRequest = req.body;

        return this.svc.getShop(body);
    }

    @Put()
    @UseGuards(GrpcAuthGuard)
    private async updateShop(@Req() req: Request): Promise<UpdateShopResponse | Observable<UpdateShopResponse>> {
        const body: UpdateShopRequest = req.body;

        return this.svc.updateShop(body);
    }

    @Delete()
    @UseGuards(GrpcAuthGuard)
    private async deleteShop(@Req() req: Request): Promise<DeleteShopResponse | Observable<DeleteShopResponse>> {
        const body: DeleteShopRequest = req.body;

        return this.svc.deleteShop(body);
    }
}