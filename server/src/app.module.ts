import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/domain/resources/env.config';
import { GlobalModule } from './share/domain/config/global.module';
import { CreateUserModule } from './createUser/interfaces/module/createUser.module';

@Module({
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CreateUserModule,
    GlobalModule,
  ],
})
export class AppModule {}
