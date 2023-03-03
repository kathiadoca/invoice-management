import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginService } from '../../application/login.service';
import configuration from '../../../share/domain/resources/env.config';
import { LoginController } from '../controller/login.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
