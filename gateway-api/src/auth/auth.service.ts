import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {firstValueFrom} from 'rxjs';
import {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient, ValidateResponse} from 'src/stubs/auth/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async validate(jwt: string): Promise<ValidateResponse> {
    return await firstValueFrom(
        this.authService.validate({
          jwt,
        }) as any,
    );
  }
}
