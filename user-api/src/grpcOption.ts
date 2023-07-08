import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';

export default (cs: ConfigService) =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      url: `0.0.0.0:${cs.get('PORT') || 4002}`,
      credentials: !cs.get<boolean>('insecure')
        ? ServerCredentials.createSsl(null, [
            {
              private_key: readFileSync(cs.get('USER_KEY')),
              cert_chain: readFileSync(cs.get('USER_CERT')),
            },
          ])
        : ServerCredentials.createInsecure(),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: [join(__dirname, 'proto/user/user.proto')],
    },
  } as GrpcOptions);

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: 'auth',
  transport: Transport.GRPC,
  options: {
    url: cs.get('AUTH_API_URL'),
    package: 'auth',
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/auth/auth.proto')],
    keepalive: {
      // Send keepalive pings every 10 seconds, default is 2 hours.
      keepaliveTimeMs: 10 * 1000,
      // Keepalive ping timeout after 5 seconds, default is 20 seconds.
      keepaliveTimeoutMs: 5 * 1000,
      // Allow keepalive pings when there are no gRPC calls.
      keepalivePermitWithoutCalls: 1,
    },
    credentials: !cs.get<boolean>('insecure')
      ? ChannelCredentials.createSsl(
          readFileSync(cs.get('ROOT_CA')),
          readFileSync(cs.get('USER_KEY')),
          readFileSync(cs.get('USER_CERT')),
        )
      : ChannelCredentials.createInsecure(),
  },
});
