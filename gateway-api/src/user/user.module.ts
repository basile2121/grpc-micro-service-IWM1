import {Global, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {PRODUCT_PACKAGE_NAME} from "../stubs/product/product";
import {join} from "path";
import {USER_PACKAGE_NAME, USER_SERVICE_NAME} from "../stubs/user/user";
import {ConfigService} from "@nestjs/config";
import {userGrpcOptions} from "../config/grpc.option";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                inject: [ConfigService],
                name: USER_PACKAGE_NAME,
                useFactory: () => userGrpcOptions(),
            },
        ]),
    ],
    controllers: [UserController],
})
export class UserModule {
}
