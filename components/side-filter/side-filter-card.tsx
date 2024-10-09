import { ReactNode } from "react";
import { Card } from "../ui/card";

const SideFilterCard = ({ children }: { children: ReactNode }) => {
  return <Card className="h-full w-[308px]">{children}</Card>;
};

const SideFilterCardHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between border-b border-border-secondary p-4 text-base font-bold">
      {children}
    </div>
  );
};

SideFilterCard.Header = SideFilterCardHeader;

const FilterItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-between gap-3 border-b border-border-secondary p-4 text-sm font-bold">
      {children}
    </div>
  );
};

SideFilterCard.FilterItemContainer = FilterItemContainer;

const FilterItemInputTiltle = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-[#171717]">{children}</h3>;
};

SideFilterCard.InputTitle = FilterItemInputTiltle;

export default SideFilterCard;
