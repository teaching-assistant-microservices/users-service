import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './adapters/in/web/users.controller';
import { UserSchema } from './adapters/out/persistence/postgres/user.schema';
import { usersProviders } from './users.providers';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [...usersProviders],
})
export class UsersModule {}
