import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductController } from './product.controller';
import { ProductProfile } from 'src/mappings/productprofile';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductProfile],
  exports:[TypeOrmModule],
  controllers: [ProductController]
})
export class ProductModule {}
