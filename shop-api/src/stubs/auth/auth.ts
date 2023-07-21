/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface LoginRequest {
  email?: string | undefined;
  password?: string | undefined;
  ip?: string | undefined;
}

export interface LoginResponse {
  refreshToken?: string | undefined;
  jwt?: string | undefined;
  status?: LoginResponse_STATUS | undefined;
}

export enum LoginResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface RefreshTokenRequest {
  refreshToken?: string | undefined;
  ip?: string | undefined;
}

export interface RefreshTokenResponse {
  refreshToken?: string | undefined;
  jwt?: string | undefined;
}

export interface ValidateRequest {
  /** Add role here */
  jwt?: string | undefined;
}

export interface ValidateResponse {
  ok?: boolean | undefined;
  userId?: string | undefined;
  userEmail?: string | undefined;
  userRole?: number | undefined;
  internal?: boolean | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  refreshToken(request: RefreshTokenRequest, metadata?: Metadata): Observable<RefreshTokenResponse>;

  validate(request: ValidateRequest, metadata?: Metadata): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  refreshToken(
    request: RefreshTokenRequest,
    metadata?: Metadata,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  validate(
    request: ValidateRequest,
    metadata?: Metadata,
  ): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "refreshToken", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
