import { Body, Controller, Delete, Get,Request, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductApiService } from './product.api.service';
import { AuthGuard, Public, RoleGuard, Roles } from 'nest-keycloak-connect';
import { Cache } from 'cache-manager';
import { ProductDocument } from '@app/foundation.business/documents/product.document';
import { ProductDTO } from '@app/foundation.business/dto/product.dto';
import { ProductService } from './service/product.service';
import { ProductSearchService } from './service/productsearch.service';

@Controller('product')
export class ProductApiController {
  constructor(private readonly productApiService: ProductApiService,
    private readonly productService: ProductService,
    private readonly productsearch:ProductSearchService) { }

  @Post('create')
  @Public()
  async create(@Body() inputProduct: ProductDTO) {
      var result = await this.productService.createProduct(inputProduct);
      let product = new ProductDocument();
      Object.assign(product, result); 
      product.categories = inputProduct.categories;
      this.productsearch.indexProduct(product);

      return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() inputProduct:ProductDTO){
      const result = await this.productService.updateProduct(id, inputProduct);
      let product = new ProductDocument();
      Object.assign(product, result);
      const existingProduct = await this.productsearch.getProductById(id);
      product.categories = existingProduct?.categories || inputProduct.categories;
      this.productsearch.indexProduct(product);
      return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      var id_result = await this.productService.viewProduct(id)
      if(!id_result){
          return {message:`Product with ID ${id} does not exist in the database.`}
      }

      return this.productService.removeProduct(id).then(()=>{
          this.productsearch.removeProduct(id);
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return await this.productService.viewProduct(id);
  }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles({roles:['clerk']})
  search(@Request() req, @Body('key') key:string){
    if(key){
      return this.productService.findAllProducts(req.user, key);
    }
    return this.productService.findAllProducts(req.user);
  }
}
