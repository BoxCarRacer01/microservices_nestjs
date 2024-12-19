import { Module } from '@nestjs/common';
import { TypeOrmFeatureModule } from 'src/3_infraestructure/repository/typeOrmFeatureModule';
import { UnitOfWork } from 'src/3_infraestructure/repository/unitOfWork';
import { OrdersController } from './ordersController';
import { OrdersServices } from 'src/2_application/services/ordersServices';
import { IOrdersServicesRef } from 'src/2_application/interfaces/iOrdersServices';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmFeatureModule
        , ClientsModule.register([
            {
                name: 'PRODUCTS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: process.env.PRODUCTS_SERVICE_HOST || '0.0.0.0',
                    port: +process.env.PRODUCTS_SERVICE_PORT || 3003
                },
            },
        ]),
    ],
    controllers: [OrdersController],
    providers: [
        UnitOfWork,
        OrdersServices,
        {
            provide: IOrdersServicesRef,
            useClass: OrdersServices,
        },
    ],
    exports: [],
})
export class OrdersModule { }