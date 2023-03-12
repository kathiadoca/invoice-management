import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDTO } from '../domain/dto/orderDto';
import { Order, OrderDocument } from '../domain/dto/order.entity';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class CreateOrderService {
  private readonly logger = new Logger(CreateOrderService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  async findOne(username: number): Promise<OrderDocument | undefined> {
    return this.orderModel.findOne({ username }).exec();
  }

  public async createOrder(orderDTO: OrderDTO): Promise<ApiResponseDto> {
    try {
      const userDb = await this.findOne(orderDTO.orderId);
      if (userDb) throw new ConflictException('User already exists');

      console.log('--->', userDb);
      /* const userEntity = new User();

      userEntity.user = userDTO.user;
      userEntity.password = userDTO.password; */
      //console.log('userEntity', userEntity);

      const userCreated = await this.orderModel.create(orderDTO);

      this.logger.log('create order request', {
        request: orderDTO,
        transactionId: this.transactionId,
        response: userCreated,
      });
      return new ApiResponseDto(HttpStatus.CREATED, OK);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      );
    }
  }
}
