import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import databaseConfig from './config/database.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { KeycloakConfigService } from './config/keycloak.config';
import { KeycloakModule } from './config/keycloak.module';
import { Keyv } from 'keyv';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load:[databaseConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async(configService:ConfigService)=>{
      const config = configService.get<TypeOrmModule>('typeorm');
      if(!config){
        throw new Error('Missing TypeORM config');
      }
      return config;
    }
  }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    UserModule,
    ProductModule,
    KeycloakConnectModule.registerAsync({
      useClass:KeycloakConfigService,
      imports:[KeycloakModule]
    }),
    CacheModule.registerAsync({
      isGlobal:true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    })
  ],
  exports: [KeycloakConnectModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ResourceGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RoleGuard,
  }
],
})
export class AppModule {}
