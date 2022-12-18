import { FormGenerator, FormTypeEnum } from "@/components";
import React from "react";

interface ITheaterPageProps {}

const TheaterPage: React.FC<ITheaterPageProps> = React.memo(({}) => {
  return (
    <div>
      <FormGenerator type={FormTypeEnum.Theater} />
    </div>
  );
});

export { TheaterPage };
