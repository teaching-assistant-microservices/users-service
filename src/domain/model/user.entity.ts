import { AcademicLevel } from '../enum/academyLevel.enum';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  academicLevel?: AcademicLevel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    password: string,
    academicLevel: AcademicLevel,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.academicLevel = academicLevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
