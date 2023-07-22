import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {ClientsModule} from '@nestjs/microservices';
import {USER_SERVICE_NAME} from "../stubs/user/user";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {userGrpcOptions} from "../grpc.option";
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
