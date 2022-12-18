import { FormGenerator, FormTypeEnum } from "@/components";
import React from "react";

interface ITicketPageProps {}

const TicketPage: React.FC<ITicketPageProps> = React.memo(({}) => {
  return (
    <div>
      <FormGenerator type={FormTypeEnum.Ticket} hasQRCode />
    </div>
  );
});

export { TicketPage };
