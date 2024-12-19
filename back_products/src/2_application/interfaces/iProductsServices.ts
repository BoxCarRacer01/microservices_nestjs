import { Products } from "src/4_core/entities/products";
import { CreateProductDto } from "src/5_common/dto/products/createProductDto";
import { UpdateStockProductDto } from "src/5_common/dto/products/updateProductDto";
import RequestResponse from "src/5_common/utils/apiResponse";

export const IProductsServicesRef = 'IProductsServices';
export interface IProductsServices {
    createProduct(productDto: CreateProductDto): Promise<RequestResponse<Products>>;
    getAllProducts(): Promise<RequestResponse<Products[]>>;
    getProductById(id: string): Promise<RequestResponse<Products>>;
    updateStockProduct(productDto: UpdateStockProductDto): Promise<RequestResponse<Products>>;
}
