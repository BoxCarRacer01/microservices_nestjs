import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './connections/database';
import { ProductsModule } from './1_presentation/products/productsModule';
import { Products } from './4_core/entities/products';
import { TypeOrmFeatureModule } from './3_infraestructure/repository/typeOrmFeatureModule';


@Module({
  imports: [
    TypeOrmFeatureModule
    , TypeOrmModule.forRoot(dataSourceOptions)
    , ProductsModule
    , TypeOrmModule.forFeature([Products])
    , ClientsModule.register([
      {
        name: 'ORDENES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ORDER_SERVICE_HOST || '0.0.0.0',
          port: +process.env.ORDER_SERVICE_PORT || 3001
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
