import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.config';

@Module({
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class KeycloakModule {}