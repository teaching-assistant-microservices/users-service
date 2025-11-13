import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/model/user.entity';
import { IUsersRepository } from '../ports/out/users.repository.port';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }
}
