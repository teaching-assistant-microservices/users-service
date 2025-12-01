import { AcademycLevel } from '../../../../../domain/enum/academyLevel.enum';
export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  academycLevel: AcademycLevel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    academyclevel: AcademycLevel,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.academycLevel = academyclevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
