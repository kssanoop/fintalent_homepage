import { ReactNode } from "react";

const InactivateSheetHeader = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-2 px-8 pb-6 pt-8">{children}</div>;
};

const Heading = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-base font-bold text-brand-black">{children}</h3>;
};

InactivateSheetHeader.Heading = Heading;

const Description = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-brand-grey">{children}</p>;
};

InactivateSheetHeader.SubHeading = Description;

export default InactivateSheetHeader;
