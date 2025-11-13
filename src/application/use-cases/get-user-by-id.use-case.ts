import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/model/user.entity';
import { IUsersRepository } from '../ports/out/users.repository.port';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
