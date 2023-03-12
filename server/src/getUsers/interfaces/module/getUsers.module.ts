import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GetUsersService } from '../../application/getUsers.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { GetUsersController } from '../controller/getUsers.controller';
import { User, UserSchema } from 'src/share/domain/dto/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongoseModule,
  ],
  controllers: [GetUsersController],
  providers: [GetUsersService],
})
export class GetUsersModule {}
