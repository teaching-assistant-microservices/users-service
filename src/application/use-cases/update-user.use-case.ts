// src/application/use-cases/update-user.use-case.ts

import { Inject, Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/model/user.entity';
import { IUsersRepository } from '../ports/out/users.repository.port';
import { AcademycLevel } from '../../domain/enum/academyLevel.enum';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(
    id: string,
    email?: string,
    name?: string,
    password?: string,
    academycLevel?:AcademycLevel
  ): Promise<User> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      
      // Verificar que el usuario existe
      const existingUser = await this.usersRepository.findById(id);
      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // Si se actualiza el email, verificar que no esté en uso
      if (email && email !== existingUser.email) {
        const userWithEmail = await this.usersRepository.findByEmail(email);
        if (userWithEmail) {
          throw new ConflictException('Email already exists');
        }
      }

      const updateData: Partial<User> = {
        updatedAt: new Date(),
      };

      if (email) updateData.email = email;
      if (name) updateData.name = name;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      if(academycLevel) updateData.academycLevel = academycLevel;

      const updatedUser = await this.usersRepository.update(id, updateData);
      
      this.logger.log(`User updated successfully: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}