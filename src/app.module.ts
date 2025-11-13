import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './infrastructure/users.module';
import { UserSchema } from './infrastructure/adapters/out/persistence/postgres/user.schema';
import { envs } from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      entities: [UserSchema],
      synchronize: envs.database.synchronize,
    }),
    UsersModule,
  ],
})
export class AppModule {}
