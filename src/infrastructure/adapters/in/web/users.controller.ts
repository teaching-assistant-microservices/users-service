import { Controller, Inject, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUsersService } from '../../../../application/ports/in/users.service.port';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller()
export class UsersController {
  constructor(
    @Inject(IUsersService)
    private readonly usersService: IUsersService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.createUser(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
      createUserDto.academycLevel
    );

    return new UserResponseDto(
      user.id,
      user.email,
      user.name,
      user.academycLevel,
      user.createdAt,
      user.updatedAt,
    );
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(
    @Payload() payload: { id: string; updateUserDto: UpdateUserDto },
  ): Promise<UserResponseDto> {
    const parseUUIDPipe = new ParseUUIDPipe();
    const id = await parseUUIDPipe.transform(payload.id, { type: 'body' });

    const user = await this.usersService.updateUser(
      id,
      payload.updateUserDto.email,
      payload.updateUserDto.name,
      payload.updateUserDto.password,
    );

    return new UserResponseDto(
      user.id,
      user.email,
      user.name,
      user.academycLevel,
      user.createdAt,
      user.updatedAt,
    );
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() payload: { id: string }): Promise<void> {
    const parseUUIDPipe = new ParseUUIDPipe();
    const id = await parseUUIDPipe.transform(payload.id, { type: 'body' });

    await this.usersService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() payload: { id: string }): Promise<UserResponseDto> {
    const parseUUIDPipe = new ParseUUIDPipe();
    const id = await parseUUIDPipe.transform(payload.id, { type: 'body' });

    const user = await this.usersService.getUserById(id);

    return new UserResponseDto(
      user.id,
      user.email,
      user.name,
      user.academycLevel,
      user.createdAt,
      user.updatedAt,
    );
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  async getUserByEmail(@Payload() payload: { email: string }): Promise<any> {
    const user = await this.usersService.getUserByEmail(payload.email);

    if (!user) {
      return null;
    }

    // Retornar usuario CON password (solo para auth-service)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
