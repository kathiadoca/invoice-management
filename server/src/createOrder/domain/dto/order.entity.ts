import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ collection: 'Orders' })
export class Order extends Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: true })
  orderItems: [];

  @Prop({ required: true })
  orderTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
