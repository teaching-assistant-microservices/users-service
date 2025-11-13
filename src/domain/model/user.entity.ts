import { AcademycLevel } from '../enum/academyLevel.enum';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  academycLevel?: AcademycLevel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    password: string,
    AcademycLevel:AcademycLevel,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.academycLevel = AcademycLevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
