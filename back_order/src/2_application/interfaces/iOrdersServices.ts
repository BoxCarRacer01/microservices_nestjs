import { Orders } from "src/4_core/entities/orders";
import { CreateOrdersDto } from "src/5_common/dto/orders/createOrdersDto";
import { DetailOrderDto } from "src/5_common/dto/orders/detailOrderDto";
import RequestResponse from "src/5_common/utils/apiResponse";

export const IOrdersServicesRef = 'IOrdersServices';
export interface IOrdersServices {
    createOrder(productDto: CreateOrdersDto[]): Promise<RequestResponse<Orders>>;
    getAllOrders(): Promise<RequestResponse<DetailOrderDto[]>>;
    getOrderById(id: string): Promise<RequestResponse<DetailOrderDto>>;    
}
