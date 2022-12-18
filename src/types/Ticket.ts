import { nanoid } from "nanoid";
import { Show } from "./Show";
import { User } from "./User";

export interface ITicketDto {
  id: string;
  show: Show;
  seatNum: string;
  price: number;
  bookingDate: Date;
  user: User;
}
export interface ITicket extends ITicketDto {
  getShow(): Show;
  getPrice(): number;
  getBookingDate(): Date;
  getUser(): User;
  getId(): string;
  getSeatNum(): string;
  toString(): string;
}
export class Ticket implements ITicket {
  id: string;
  show: Show;
  seatNum: string;
  price: number;
  bookingDate: Date;
  user: User;
  constructor(ticket: ITicketDto) {
    this.id = nanoid();
    this.show = ticket.show;
    this.seatNum = ticket.seatNum;
    this.price = ticket.price;
    this.bookingDate = ticket.bookingDate;
    this.user = ticket.user;
  }
  public static create(ticket: ITicketDto): Ticket {
    return new Ticket(ticket);
  }
  public static getSampleData(): Ticket {
    return new Ticket({
      id: nanoid(),
      show: Show.getSampleData(),
      seatNum: "A1",
      price: 100,
      bookingDate: new Date(),
      user: User.getSampleData(),
    });
  }

  public getShow(): Show {
    return this.show;
  }
  public getPrice(): number {
    return this.price;
  }
  public getBookingDate(): Date {
    return this.bookingDate;
  }
  public getUser(): User {
    return this.user;
  }
  public getId(): string {
    return this.id;
  }
  public getSeatNum(): string {
    return this.seatNum;
  }
  public toString(): string {
    return `${this.id}\r\n${this.show.movie.name}`;
  }
}
