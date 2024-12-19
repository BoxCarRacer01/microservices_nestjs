import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'El nombre del producto es obligatorio' })
    name: string;

    @IsNumber({}, { message: 'El stock es obligatorio' })
    stock: number;

    @IsNumber({}, { message: 'El precio es obligatorio' })
    @IsPositive({ message: 'El precio debe ser positivo' })
    price: number;
}