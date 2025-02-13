import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() inputProduct: ProductDTO) {
        return this.productService.createProduct(inputProduct);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() inputProduct:ProductDTO){
        return this.productService.updateProduct(id,inputProduct);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.removeProduct(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.viewProduct(id);
    }

    @Get('search/:key')
    search(@Param('key') key:string){
        return this.productService.search(key);
    }
    @Get()
    findAllProduct(){
        return this.productService.findAllProduct();
    }

}
