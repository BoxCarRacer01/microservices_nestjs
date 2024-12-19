import { Type } from 'class-transformer';
import { IsString, IsNumber, IsPositive, IsArray, ValidateNested } from 'class-validator';

export class CreateOrdersDto {
    @IsString({ message: 'El id del producto es obligatorio' })
    idProduct: string;

    @IsNumber({}, { message: 'La cantidad de la orden es obligatorio' })
    @IsPositive({ message: 'La cantidad debe ser positiva' })
    countOrder: number;
}

export class ListCreateOrdersDto {
    @IsArray({ message: 'La lista de productos no puede estar vacía' })
    @ValidateNested({ each: true })
    @Type(() => CreateOrdersDto)
    listOrder: CreateOrdersDto[];
}