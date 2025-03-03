import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UsePipes(new ValidationPipe())
    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string) {
        return this.productService.getAll(searchTerm)
    }

    @Get('by-slug/:slug')
    async getProductBySlug(@Param('slug') slug: string) {
        return this.productService.bySlug(slug)
    }

    @Get('by-category/:categorySlug')
    async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
        return this.productService.byCategory(categorySlug)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    async create(@Body() dto: ProductDto) {
        return this.productService.create(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    @Auth()
    async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
        return this.productService.update(id, dto)
    }

    @HttpCode(200)
    @Delete(':id')
    @Auth()
    async deleteProduct(@Param('id') id: string) {
        return this.productService.delete(id)
    }
}
