import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/4_core/entities/orders";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Orders
        ]),
    ],
    exports: [
        TypeOrmModule.forFeature([
            Orders
        ]),
    ],
})
export class TypeOrmFeatureModule { }

