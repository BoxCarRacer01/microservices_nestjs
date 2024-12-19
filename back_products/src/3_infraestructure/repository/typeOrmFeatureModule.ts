import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/4_core/entities/products";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Products
        ]),
    ],
    exports: [
        TypeOrmModule.forFeature([
            Products
        ]),
    ],
})
export class TypeOrmFeatureModule { }

