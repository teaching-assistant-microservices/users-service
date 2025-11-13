import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../../domain/model/user.entity';
import { IUsersRepository } from '../../../../../application/ports/out/users.repository.port';
import { UserSchema } from './user.schema';

@Injectable()
export class UsersRepositoryAdapter implements IUsersRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async save(user: User): Promise<User> {
    const userSchema = this.userRepository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    const savedUser = await this.userRepository.save(userSchema);
    return this.toDomain(savedUser);
  }

  async findById(id: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({ where: { id } });
    return userSchema ? this.toDomain(userSchema) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({ where: { email } });
    return userSchema ? this.toDomain(userSchema) : null;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return this.toDomain(updatedUser);
  }

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private toDomain(schema: UserSchema): User {
    return new User(
      schema.id,
      schema.email,
      schema.name,
      schema.password,
      schema.createdAt,
      schema.updatedAt,
    );
  }
}
