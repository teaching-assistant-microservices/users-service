import { User } from '../../../domain/model/user.entity';
import { AcademicLevel } from '../../../domain/enum/academyLevel.enum';

export interface IUsersService {
  createUser(email: string, name: string, password: string, academicLevel: AcademicLevel): Promise<User>;
  updateUser(id: string, email?: string, name?: string, password?: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}

export const IUsersService = Symbol('IUsersService');
