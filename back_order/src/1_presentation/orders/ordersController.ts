import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { IOrdersServices, IOrdersServicesRef } from 'src/2_application/interfaces/iOrdersServices';
import { ListCreateOrdersDto } from 'src/5_common/dto/orders/createOrdersDto';
import RequestResponse from 'src/5_common/utils/apiResponse';

@Controller('orders')
export class OrdersController {
    constructor(@Inject(IOrdersServicesRef) readonly orderService: IOrdersServices) { }

    @Post('createOrder')
    @UsePipes(new ValidationPipe())
    async createOrder(@Body() createOrderDto: ListCreateOrdersDto) {
        try {
            return await this.orderService.createOrder(createOrderDto.listOrder);
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getAllOrders')
    async getAllOrders() {
        try {
            return await this.orderService.getAllOrders();
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getOrderById/:id')
    async getOrderById(@Param('id') id: string) {
        try {
            return await this.orderService.getOrderById(id);
        } catch (error: any) {
            const apiResponse = new RequestResponse(error.message, false, error);
            throw new HttpException(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
