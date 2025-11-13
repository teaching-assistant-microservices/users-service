import { Provider } from '@nestjs/common';
import { IUsersService } from '../application/ports/in/users.service.port';
import { IUsersRepository } from '../application/ports/out/users.repository.port';
import { UsersService } from '../domain/users.service';
import { UsersRepositoryAdapter } from './adapters/out/persistence/postgres/users.repository.adapter';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/get-user-by-email.use-case';

export const usersProviders: Provider[] = [
  // Use Cases
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,

  // Service
  {
    provide: IUsersService,
    useClass: UsersService,
  },

  // Repository
  {
    provide: IUsersRepository,
    useClass: UsersRepositoryAdapter,
  },
];
