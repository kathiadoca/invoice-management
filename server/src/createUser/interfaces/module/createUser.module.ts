import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateUserService } from '../../application/createUser.service';
import configuration from '../../../share/domain/resources/env.config';
import { User, UserSchema } from '../../domain/dto/user.entity';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { CreateUserController } from '../controller/createUser.controller';

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
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class CreateUserModule {}
