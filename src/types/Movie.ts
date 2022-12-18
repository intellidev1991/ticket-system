import { nanoid } from "nanoid";
export interface IMovieDto {
  id: string;
  name: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: Date;
  director: string;
  producer: string;
  cast: string;
  description: string;
}

export interface IMovie extends IMovieDto {
  getId(): string;
  getName(): string;
  getDuration(): number;
  getLanguage(): string;
  getGenre(): string;
  getReleaseDate(): Date;
  getDirector(): string;
  getProducer(): string;
  getCast(): string;
  getDescription(): string;
  getData(): IMovieDto;
  toString(): string;
}

export class Movie implements IMovie {
  id: string;
  name: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: Date;
  director: string;
  producer: string;
  cast: string;
  description: string;

  constructor(movie: IMovieDto) {
    this.id = nanoid();
    this.name = movie.name;
    this.duration = movie.duration;
    this.language = movie.language;
    this.genre = movie.genre;
    this.releaseDate = movie.releaseDate;
    this.director = movie.director;
    this.producer = movie.producer;
    this.cast = movie.cast;
    this.description = movie.description;
  }
  public static create(movie: IMovie) {
    return new Movie(movie);
  }

  public static getSampleData(): IMovie {
    return new Movie({
      id: nanoid(),
      name: "The Shawshank Redemption",
      duration: 142,
      language: "English",
      genre: "Drama",
      releaseDate: new Date("1994-09-23"),
      director: "Frank Darabont",
      producer: "Niki Marvin",
      cast: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler, Clancy Brown, Gil Bellows",
      description: "Two imprisoned",
    });
  }

  public getData() {
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      language: this.language,
      genre: this.genre,
      releaseDate: this.releaseDate,
      director: this.director,
      producer: this.producer,
      cast: this.cast,
      description: this.description,
    };
  }

  public getName(): string {
    return this.name;
  }
  public getDuration(): number {
    return this.duration;
  }
  public getLanguage(): string {
    return this.language;
  }
  public getGenre(): string {
    return this.genre;
  }
  public getReleaseDate(): Date {
    return this.releaseDate;
  }
  public getDirector(): string {
    return this.director;
  }
  public getProducer(): string {
    return this.producer;
  }
  public getCast(): string {
    return this.cast;
  }
  public getDescription(): string {
    return this.description;
  }
  public getId(): string {
    return this.id;
  }
  public toString(): string {
    return `${this.name}`;
  }
}
