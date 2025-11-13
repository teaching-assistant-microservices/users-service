import { AcademycLevel } from '../../../../../domain/enum/academyLevel.enum';
export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  academycLevel:AcademycLevel

  constructor(id: string, email: string, name: string, academyclevel: string , createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
