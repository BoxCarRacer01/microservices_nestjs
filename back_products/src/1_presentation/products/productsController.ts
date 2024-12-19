import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import { IProductsServices, IProductsServicesRef } from 'src/2_application/interfaces/iProductsServices';
import { CreateProductDto } from 'src/5_common/dto/products/createProductDto';
import { UpdateStockProductDto } from 'src/5_common/dto/products/updateProductDto';
import RequestResponse from 'src/5_common/utils/apiResponse';

@Controller('products')
export class ProductsController {
    constructor(@Inject(IProductsServicesRef) readonly productService: IProductsServices) { }
    // === HTTP
    @Post('createProduct')
    @ApiOperation({ summary: 'Crear un producto' })
    createProduct(@Body() createProductDto: CreateProductDto) {
        try {
            return this.productService.createProduct(createProductDto);
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getAllProducts')
    getAllProducts() {
        try {
            return this.productService.getAllProducts();
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getProductById/:id')
    async getProductById(@Param('id') id: string) {
        try {
            return await this.productService.getProductById(id);
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, null);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('updateStockProduct')
    updateStockProduct(@Body() productDto: UpdateStockProductDto) {
        try {
            return this.productService.updateStockProduct(productDto);
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // === TCP

    @MessagePattern({ cmd: 'getProductById' })
    async tcpGetProductById(payload: { id: string }) {
        try {
            return await this.productService.getProductById(payload.id);
        } catch (error) {
            return { message: error.message, success: false };
        }
    }

    @MessagePattern({ cmd: 'updateStockProduct' })
    async tcpUpdateStockProduct(payload: UpdateStockProductDto) {
        try {
            return await this.productService.updateStockProduct(payload);
        } catch (error) {
            return { message: error.message, success: false };
        }
    }

}
