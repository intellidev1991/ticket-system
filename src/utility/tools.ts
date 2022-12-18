import { FormTypeEnum } from "@/components";
import { Movie, Show, Theater, Ticket, User } from "@/types";

export const tools = {
  capitalize: (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  // convert camelCase to separate words with spaces between them and capitalize the first letter of each word
  camelCaseToWords: (str: string) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  },
  // automatically parse Json string to object for properties  of  (movie, theater, show, user)
  parseJson: (data: any) => {
    const value = data;
    const keys = Object.keys(value);
    keys.forEach((key) => {
      if (
        key === "movie" ||
        key === "theater" ||
        key === "show" ||
        key === "user"
      ) {
        try {
          //@ts-ignore
          value[key] = JSON.parse(value[key]);
        } catch (error) {
          console.log("Not a JSON string");
        }
      }
    });
    return value;
  },
  objectFactory: (type: FormTypeEnum) => {
    switch (type) {
      case FormTypeEnum.Movie:
        return Movie;
      case FormTypeEnum.User:
        return User;
      case FormTypeEnum.Show:
        return Show;
      case FormTypeEnum.Theater:
        return Theater;
      case FormTypeEnum.Ticket:
        return Ticket;
      default:
        return Movie;
    }
  },
};
