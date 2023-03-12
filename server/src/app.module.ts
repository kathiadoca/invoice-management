import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/domain/resources/env.config';
import { GlobalModule } from './share/domain/config/global.module';
import { CreateUserModule } from './createUser/interfaces/module/createUser.module';
import { DeleteUserModule } from './deleteUser/interfaces/module/deleteUser.module';
import { UpdateUserModule } from './updateUser/interfaces/module/updateUser.module';
import { GetUsersModule } from './getUsers/interfaces/module/getUsers.module';
import { CreateOrderModule } from './createOrder/interfaces/module/createOrder.module';

@Module({
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CreateUserModule,
    DeleteUserModule,
    UpdateUserModule,
    GetUsersModule,
    CreateOrderModule,
    GlobalModule,
  ],
})
export class AppModule {}
