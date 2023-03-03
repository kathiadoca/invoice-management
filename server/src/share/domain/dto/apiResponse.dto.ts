import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  responseCode: number;

  @ApiProperty()
  message: string;

  constructor(responseCode: number, message: string) {
    this.responseCode = responseCode;
    this.message = message;
  }
}
