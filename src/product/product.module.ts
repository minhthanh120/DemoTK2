import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductController } from './product.controller';
import { ProductProfile } from 'src/mappings/productprofile';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from 'src/config/keycloak.config';
import { KeycloakModule } from 'src/config/keycloak.module';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),
    KeycloakConnectModule.registerAsync({
        useExisting: KeycloakConfigService,
        imports: [KeycloakModule],
    })
  ],
  providers: [ProductService, ProductProfile],
  exports:[TypeOrmModule],
  controllers: [ProductController]
})
export class ProductModule {}
