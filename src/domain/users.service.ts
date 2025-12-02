import { Injectable } from '@nestjs/common';
import { User } from './model/user.entity';
import { IUsersService } from '../application/ports/in/users.service.port';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/get-user-by-email.use-case';
import { AcademicLevel } from './enum/academyLevel.enum';

@Injectable()
export class UsersService implements IUsersService {
  private createUserUseCase: CreateUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private getUserByEmailUseCase: GetUserByEmailUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getUserByIdUseCase: GetUserByIdUseCase,
    getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.getUserByIdUseCase = getUserByIdUseCase;
    this.getUserByEmailUseCase = getUserByEmailUseCase;
  }

  async createUser(email: string, name: string, password: string, academicLevel: AcademicLevel): Promise<User> {
    return await this.createUserUseCase.execute(email, name, password, academicLevel);
  }

  async updateUser(
    id: string,
    email?: string,
    name?: string,
    password?: string,
    academicLevel?: AcademicLevel
  ): Promise<User> {
    return await this.updateUserUseCase.execute(id, email, name, password, academicLevel);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.deleteUserUseCase.execute(id);
  }

  async getUserById(id: string): Promise<User> {
    return await this.getUserByIdUseCase.execute(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.getUserByEmailUseCase.execute(email);
  }
}
