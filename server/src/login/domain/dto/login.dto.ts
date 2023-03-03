import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Usuario' })
  user: string;

  @ApiProperty({ description: 'Contraseña del cliente' })
  password: string;
}
