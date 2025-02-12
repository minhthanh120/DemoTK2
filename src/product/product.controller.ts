import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Post()
    create(@Body() inputProduct: ProductDTO){
        return this.productService.createProduct(inputProduct);
    }
}
