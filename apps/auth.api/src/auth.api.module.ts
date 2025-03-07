import { Module } from '@nestjs/common';
import { AuthApiController } from './auth.api.controller';
import { AuthApiService } from './auth.api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/foundation.business/entity/user.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakModule, KeycloakService } from '@app/keycloak';
import { RedisCacheModule } from '@app/rediscache';
import { FoundationBusinessModule } from '@app/foundation.business';
import { SearchModule } from '@app/search';
import { AuthService } from './service/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
        KeycloakConnectModule.registerAsync({
            useExisting: KeycloakService,
            imports: [KeycloakModule],
    }),
    HttpModule,
    RedisCacheModule,
    FoundationBusinessModule,
    SearchModule],
  controllers: [AuthApiController],
  exports:[TypeOrmModule, FoundationBusinessModule, AuthService],
  providers: [AuthApiService, AuthService],
})
export class AuthApiModule {}
