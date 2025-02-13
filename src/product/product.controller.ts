import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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
    
}
