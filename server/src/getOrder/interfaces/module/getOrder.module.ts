import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GetOrderService } from '../../application/getOrder.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { CreateOrderController } from '../controller/getOrder.controller';
import {
  Order,
  OrderSchema,
} from '../../../createOrder/domain/dto/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    MongoseModule,
  ],
  controllers: [CreateOrderController],
  providers: [GetOrderService],
})
export class GetOrderModule {}
