import { User } from '../../../domain/model/user.entity';

export interface IUsersRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updateData: Partial<User>): Promise<User>;
  deleteById(id: string): Promise<void>;
}

export const IUsersRepository = Symbol('IUsersRepository');
