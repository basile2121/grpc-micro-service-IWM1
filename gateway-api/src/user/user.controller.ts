import {Controller, Get, Inject, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ClientGrpc} from "@nestjs/microservices";
import {Request} from "express";
import {Observable} from "rxjs";
import {
    FindRequest, FindResponse,
    RegisterRequest,
    RegisterResponse, UpdateRequest, UpdateResponse,
    USER_SERVICE_NAME,
    UserServiceClient,
} from "../stubs/user/user";
import {AuthGuard} from "../auth/auth.guard";

@Controller('user')
export class UserController {
    private svc: UserServiceClient;

    @Inject(USER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    @Post()
    private async registerUser(@Req() req: Request): Promise<Observable<RegisterResponse>> {
        const body: RegisterRequest = req.body;

        return this.svc.register(body);
    }

    @Get()
    @UseGuards(AuthGuard)
    private async findUser(@Req() req: Request): Promise<Observable<FindResponse>> {
        const body: FindRequest = req.body;

        return this.svc.find(body);
    }

    @Put()
    @UseGuards(AuthGuard)
    private async updateUser(@Req() req: Request): Promise<Observable<UpdateResponse>> {
        const body: UpdateRequest = req.body;

        return this.svc.update(body);
    }
}
