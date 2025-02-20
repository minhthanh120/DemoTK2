import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from 'src/config/keycloak.config';
import { KeycloakModule } from 'src/config/keycloak.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  KeycloakConnectModule.registerAsync({
    useExisting: KeycloakConfigService,
    imports: [KeycloakModule],
})],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule]
})
export class UserModule {}
