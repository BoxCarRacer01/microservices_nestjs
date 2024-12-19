import { IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateStockProductDto {
    @IsString({ message: 'El id del producto es obligatorio' })
    id: string;

    @IsNumber({}, { message: 'El stock es obligatorio' })
    @IsPositive({ message: 'El precio debe ser positivo' })
    stock: number;
}