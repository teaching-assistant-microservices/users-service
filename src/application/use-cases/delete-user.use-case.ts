import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '../ports/out/users.repository.port';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Verificar que el usuario existe
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteById(id);
  }
}
