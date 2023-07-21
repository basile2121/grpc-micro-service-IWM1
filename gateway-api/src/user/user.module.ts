import {Global, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {PRODUCT_PACKAGE_NAME} from "../stubs/product/product";
import {join} from "path";
import {USER_PACKAGE_NAME, USER_SERVICE_NAME} from "../stubs/user/user";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {userGrpcOptions} from "../grpc.option";
import {AuthService} from "../auth/auth.service";
import {AppModule} from "../app.module";
import {AppService} from "../app.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync([
            {
                inject: [ConfigService],
                imports:[ConfigModule],
                name: USER_SERVICE_NAME,
                useFactory: (cs: ConfigService) => userGrpcOptions(cs),
            },
        ]),
    ],
    controllers: [UserController],
})
export class UserModule {
}
