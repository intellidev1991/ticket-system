import { FormGenerator, FormTypeEnum } from "@/components";
import React from "react";

interface IShowPageProps {}

const ShowPage: React.FC<IShowPageProps> = React.memo(({}) => {
  return (
    <div>
      <FormGenerator type={FormTypeEnum.Show} />
    </div>
  );
});

export { ShowPage };
