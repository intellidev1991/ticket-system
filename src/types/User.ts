import { PasswordManager } from "@/utility/PasswordManager";
import { nanoid } from "nanoid";

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserDto {
  isPasswordValid(password: string): boolean;
  getData(): IUserDto;
  getId(): string;
  toString(): string;
}

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(user: IUserDto) {
    const { name, email, password } = user;
    this.id = nanoid();
    this.name = name;
    this.email = email;
    this.password = new PasswordManager().encrypt(password);
  }

  static create(user: IUser) {
    return new User(user);
  }

  static getSampleData(): User {
    return new User({
      id: nanoid(),
      name: "John Doe",
      email: "a@yahoo.com",
      password: "123456",
    });
  }

  isPasswordValid(password: string) {
    return new PasswordManager().comparePassword(password, this.password);
  }

  public getData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  public getId() {
    return this.id;
  }

  public toString() {
    return `${this.email}`;
  }
}
