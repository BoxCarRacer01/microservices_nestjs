import { Injectable } from '@nestjs/common';
import { UnitOfWork } from 'src/3_infraestructure/repository/unitOfWork';
import { IProductsServices } from '../interfaces/iProductsServices';
import { Products } from 'src/4_core/entities/products';
import RequestResponse from 'src/5_common/utils/apiResponse';
import { CreateProductDto } from 'src/5_common/dto/products/createProductDto';
import { plainToClass } from 'class-transformer';
import { UpdateStockProductDto } from 'src/5_common/dto/products/updateProductDto';

@Injectable()
export class ProductsServices implements IProductsServices {
  constructor(
    private readonly unitOfWork: UnitOfWork
  ) { }

  async createProduct(productDto: CreateProductDto): Promise<RequestResponse<Products>> {
    let dataProduct = plainToClass(Products, productDto);
    const productRes = await this.unitOfWork.productsRepository().add(dataProduct);
    return new RequestResponse<Products>("Registrado", true, productRes);
  }

  async getAllProducts(): Promise<RequestResponse<Products[]>> {
    const listProducts = await this.unitOfWork.productsRepository().getAll();
    return new RequestResponse<Products[]>("Consultado", true, listProducts);
  }

  async getProductById(id: string): Promise<RequestResponse<Products>> {
    const product = await this.unitOfWork.productsRepository().getById(id);
    if (product == null) throw new Error(`El producto con id ${id} no existe`);
    return new RequestResponse<Products>("Consultado", true, product);
  }

  async updateStockProduct(productDto: UpdateStockProductDto): Promise<RequestResponse<Products>> {
    const oldProduct = await this.getProductById(productDto.id);
    oldProduct.data.stock = productDto.stock;
    const productRes = await this.unitOfWork.productsRepository().updateEntity(oldProduct.data);
    return new RequestResponse<Products>("Actualizado", true, productRes);
  }
}
