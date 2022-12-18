import { nanoid } from "nanoid";

interface ITheaterDto {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  capacity: number;
}

interface ITheater extends ITheaterDto {
  getId(): string;
  getName(): string;
  getAddress(): string;
  getCity(): string;
  getState(): string;
  getZipCode(): string;
  getCountry(): string;
  getCapacity(): number;
  toString(): string;
}

export class Theater implements ITheater {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  capacity: number;

  constructor(theater: ITheaterDto) {
    this.id = nanoid();
    this.name = theater.name;
    this.address = theater.address;
    this.city = theater.city;
    this.state = theater.state;
    this.zipCode = theater.zipCode;
    this.country = theater.country;
    this.capacity = theater.capacity;
  }

  // create static method to create a new instance of Theater
  public static create(theater: ITheaterDto): Theater {
    return new Theater(theater);
  }

  // get sample data
  public static getSampleData(): Theater {
    return new Theater({
      id: nanoid(),
      name: "Theater 1",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      capacity: 1000,
    });
  }

  public getName(): string {
    return this.name;
  }
  public getAddress(): string {
    return this.address;
  }
  public getCity(): string {
    return this.city;
  }
  public getState(): string {
    return this.state;
  }
  public getZipCode(): string {
    return this.zipCode;
  }
  public getCountry(): string {
    return this.country;
  }
  public getCapacity(): number {
    return this.capacity;
  }
  public getId(): string {
    return this.id;
  }
  public toString(): string {
    return `${this.name}\r\n${this.address}\r\n${this.city}`;
  }
}
