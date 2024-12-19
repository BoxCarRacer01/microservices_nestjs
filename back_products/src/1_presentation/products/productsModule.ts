import { Module } from '@nestjs/common';
import { TypeOrmFeatureModule } from 'src/3_infraestructure/repository/typeOrmFeatureModule';
import { UnitOfWork } from 'src/3_infraestructure/repository/unitOfWork';
import { ProductsController } from './productsController';
import { ProductsServices } from 'src/2_application/services/productsServices';
import { IProductsServicesRef } from 'src/2_application/interfaces/iProductsServices';

@Module({
    imports: [
        TypeOrmFeatureModule,
    ],
    controllers: [ProductsController],
    providers: [
        UnitOfWork,
        ProductsServices,
        {
            provide: IProductsServicesRef,
            useClass: ProductsServices,
        },
    ],
    exports: [],
})
export class ProductsModule { }