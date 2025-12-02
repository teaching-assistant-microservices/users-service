import { AcademicLevel } from '../../../../../domain/enum/academyLevel.enum';
export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  academicLevel: AcademicLevel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    academicLevel: AcademicLevel,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.academicLevel = academicLevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
