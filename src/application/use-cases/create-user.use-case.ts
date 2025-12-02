import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/model/user.entity';
import { IUsersRepository } from '../ports/out/users.repository.port';
import { AcademicLevel } from 'src/domain/enum/academyLevel.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(email: string, name: string, password: string, academicLevel: AcademicLevel): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = new User(
      randomUUID(),
      email,
      name,
      hashedPassword,
      academicLevel,
      new Date(),
      new Date(),
    );

    return await this.usersRepository.save(user);
  }
}
