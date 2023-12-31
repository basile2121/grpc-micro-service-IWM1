
import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {AuthServiceClient, AUTH_SERVICE_NAME, LoginRequest, LoginResponse} from '../stubs/auth/auth';

@Controller('auth')
export class AuthController implements OnModuleInit {
    private svc: AuthServiceClient;

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    @Post('login')
    private async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
        return this.svc.login(body);
    }
}