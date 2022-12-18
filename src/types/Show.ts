import { nanoid } from "nanoid";
import { Movie } from "./Movie";
import { Theater } from "./Theater";

export interface IShowDto {
  id: string;
  movie: Movie;
  theater: Theater;
  startTime: Date;
  endTime: Date;
}
export interface IShow extends IShowDto {
  getId(): string;
  getMovie(): Movie;
  getTheater(): Theater;
  getStartTime(): Date;
  getEndTime(): Date;
  toString(): string;
}
export class Show implements IShow {
  id: string;
  movie: Movie;
  theater: Theater;
  startTime: Date;
  endTime: Date;
  constructor(show: IShowDto) {
    this.id = nanoid();
    this.movie = show.movie;
    this.theater = show.theater;
    this.startTime = show.startTime;
    this.endTime = show.endTime;
  }
  public static create(show: IShowDto): Show {
    return new Show(show);
  }
  public static getSampleData(): Show {
    return new Show({
      id: nanoid(),
      movie: Movie.getSampleData(),
      theater: Theater.getSampleData(),
      startTime: new Date(),
      endTime: new Date(),
    });
  }

  public getMovie(): Movie {
    return this.movie;
  }
  public getTheater(): Theater {
    return this.theater;
  }
  public getStartTime(): Date {
    return this.startTime;
  }
  public getEndTime(): Date {
    return this.endTime;
  }
  public getId(): string {
    return this.id;
  }
  public toString(): string {
    return `${this.movie}\r\n${this.theater}`;
  }
}
