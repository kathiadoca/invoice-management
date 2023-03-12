import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty()
  @IsNotEmpty()
  orderDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  orderItems: string;

  @ApiProperty()
  @IsNotEmpty()
  orderTotal: string;
}
