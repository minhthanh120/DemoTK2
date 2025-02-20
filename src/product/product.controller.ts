import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/dto/product.dto';
import {Resource, Roles, Scopes, Public, RoleMatchingMode, AuthGuard} from 'nest-keycloak-connect';
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('create')
    @Public()
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
    @UseGuards(AuthGuard)
    search(@Request() req, @Param('key') key:string){
        return this.productService.search(key, req.user);
    }
    @Get()
    getAllProduct(@Request() req){
        return this.productService.findAllProduct(req.user);
    }

}
