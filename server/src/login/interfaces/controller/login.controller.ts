import { Body, Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from '../../domain/dto/login.dto';
import { LoginService } from '../../application/login.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('NewContract')
@Controller('NewContract')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: LoginService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Post()
  async newContract(
    @Res() res: Response,
    @Body() payload: LoginDto,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: payload,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.procedimientoActivacion(
        payload,
      );
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/NewContract finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
