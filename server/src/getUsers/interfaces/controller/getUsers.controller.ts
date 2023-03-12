import { Controller, Get, Inject, Logger, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetUsersService } from '../../application/getUsers.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('user')
@Controller('user')
export class GetUsersController {
  private readonly logger = new Logger(GetUsersController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: GetUsersService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Get()
  async createUser(@Res() res: Response): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.getUser();
      res.status(200).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
