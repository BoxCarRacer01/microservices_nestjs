import { Inject, Injectable } from '@nestjs/common';
import { UnitOfWork } from 'src/3_infraestructure/repository/unitOfWork';
import { IOrdersServices } from '../interfaces/iOrdersServices';
import RequestResponse from 'src/5_common/utils/apiResponse';
import { Orders } from 'src/4_core/entities/orders';
import { CreateOrdersDto } from 'src/5_common/dto/orders/createOrdersDto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DetailProductDto } from 'src/5_common/dto/products/detailProductDto';
import { plainToClass } from 'class-transformer';
import { DetailOrderDto } from 'src/5_common/dto/orders/detailOrderDto';

@Injectable()
export class OrdersServices implements IOrdersServices {
  constructor(
    private readonly unitOfWork: UnitOfWork
    , @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy
  ) { }

  async createOrder(productDto: CreateOrdersDto[]): Promise<RequestResponse<Orders>> {
    let listProducts: DetailProductDto[] = [];
    const listOrders: Orders[] = [];
    for (const data of productDto) {
      if (!data.idProduct) { throw new Error('El id del producto es obligatorio'); }
      if (!data.countOrder) { throw new Error('La cantidad de la orden es obligatoria'); }
      const productData = await this.getProductDetailById(data.idProduct);
      if (data.countOrder > productData.stock) throw new Error(`La cantidad solicitada para el producto ${productData.name} supera el stock disponible. Solo hay ${productData.stock} unidades disponibles.`);
      listProducts = this.validateStockProducts(listProducts, data, productData);
      const dataOrder = plainToClass(Orders, data);
      listOrders.push(dataOrder);
    }
    const lsNewOrders = await this.unitOfWork.orderRepository().addList(listOrders);
    listProducts.forEach(product => { firstValueFrom(this.client.send({ cmd: 'updateStockProduct' }, product)); });
    return new RequestResponse<any>("Registrado", true, lsNewOrders);
  }

  async getProductDetailById(idProduct: string): Promise<DetailProductDto> {
    const { data: productData } = await firstValueFrom(this.client.send({ cmd: 'getProductById' }, { id: idProduct }));
    if (productData == null || productData == undefined) throw new Error(`El producto con id ${idProduct} no existe`)
    return productData;
  }

  validateStockProducts(listProducts: DetailProductDto[], orderDto: CreateOrdersDto, product: DetailProductDto): DetailProductDto[] {
    const productExist = listProducts.find(e => e.id == orderDto.idProduct);
    if (productExist != null) {
      if (orderDto.countOrder > productExist.stock) throw new Error(`La cantidad solicitada para el producto ${product.name} supera el stock disponible. Solo hay ${product.stock} unidades disponibles.`);
      productExist.stock = productExist.stock - orderDto.countOrder;
    } else {
      product.stock = product.stock - orderDto.countOrder;
      listProducts.push(product)
    }
    return listProducts;
  }

  async getAllOrders(): Promise<RequestResponse<DetailOrderDto[]>> {
    const listOrders = await this.unitOfWork.orderRepository().getAll();
    const listOrderDto: DetailOrderDto[] = [];
    for (const order of listOrders) {
      const dataOrder = plainToClass(DetailOrderDto, order);
      const product = await this.getProductDetailById(dataOrder.idProduct);
      dataOrder.txtProduct = product.name;
      listOrderDto.push(dataOrder);
    }
    return new RequestResponse<DetailOrderDto[]>("Consultado", true, listOrderDto);
  }

  async getOrderById(id: string): Promise<RequestResponse<DetailOrderDto>> {
    const order = await this.unitOfWork.orderRepository().getById(id);
    if (order == null) throw `La orden con id ${id} no existe`;
    let dataOrder = plainToClass(DetailOrderDto, order);
    const product = await this.getProductDetailById(order.idProduct);
    dataOrder.txtProduct = product.name;
    return new RequestResponse<DetailOrderDto>("Consultado", true, dataOrder);
  }
}
