import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export const StaticsCard = ({ children }: { children: ReactNode }) => {
  return <Card className="flex w-full items-start gap-2 p-5">{children}</Card>;
};

const StaticsValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-xl font-bold text-brand-black">{children}</p>;
};

const StaticsLabel = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-brand-grey">{children}</p>;
};

StaticsCard.Value = StaticsValue;

StaticsCard.Label = StaticsLabel;
