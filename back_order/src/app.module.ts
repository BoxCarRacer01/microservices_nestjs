import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { OrdersModule } from './1_presentation/orders/ordersModule';
import { TypeOrmFeatureModule } from './3_infraestructure/repository/typeOrmFeatureModule';
import { Orders } from './4_core/entities/orders';
import { dataSourceOptions } from './connections/database';

@Module({
  imports: [
    TypeOrmFeatureModule
    , TypeOrmModule.forRoot(dataSourceOptions)
    , OrdersModule
    , TypeOrmModule.forFeature([Orders])

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
