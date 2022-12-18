import React from "react";
import { FormGenerator, FormTypeEnum } from "@/components";

interface IUserPageProps {}

const UserPage: React.FC<IUserPageProps> = React.memo(({}) => {
  return (
    <div>
      <FormGenerator type={FormTypeEnum.User} hasQRCode />
    </div>
  );
});

export { UserPage };
