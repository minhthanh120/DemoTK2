import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  constructor(private readonly configService:ConfigService){}
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.configService.get<string>('KEYCLOAK_REALM'),
      clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
      secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET', `${process.env.KEYCLOAK_CLIENT_SECRET}`),
      logLevels: ['verbose'],
      useNestLogger: false, 
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }}
