import { Module } from '@nestjs/common';
import { ProductApiController } from './product.api.controller';
import { ProductApiService } from './product.api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/foundation.business/entity/product.entity';
import { Category } from '@app/foundation.business/entity/category.entity';
import { ProductCategory } from '@app/foundation.business/entity/product-category.entity';
import { SearchModule } from '@app/search';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakModule, KeycloakService } from '@app/keycloak';
import { FoundationBusinessModule } from '@app/foundation.business';
import { RedisCacheModule } from '@app/rediscache';
import { ProductSearchService } from './service/productsearch.service';
import { ProductService } from './service/product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductCategory]),
      KeycloakConnectModule.registerAsync({
          useExisting: KeycloakService,
          imports: [KeycloakModule],
  }),
  RedisCacheModule,
  FoundationBusinessModule,
  //ProductSearchService,
  SearchModule
],
  controllers: [ProductApiController],
  exports:[
    TypeOrmModule,
    FoundationBusinessModule,
    ProductService,
    ProductSearchService
  ],
  providers: [
    ProductApiService, 
    //SearchModule,
    ProductService,
    ProductSearchService
  ],
})
export class ProductApiModule {}
