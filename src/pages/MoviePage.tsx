import React from "react";
import { FormGenerator, FormTypeEnum } from "@/components";

interface IMoviePageProps {}

const MoviePage: React.FC<IMoviePageProps> = React.memo(({}) => {
  return (
    <div>
      <FormGenerator type={FormTypeEnum.Movie} />
    </div>
  );
});

export { MoviePage };
