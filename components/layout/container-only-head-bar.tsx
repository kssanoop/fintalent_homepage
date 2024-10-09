import { ReactNode } from "react";

const ContainerOnlyHeadBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-[62px] items-center justify-between border-b border-border bg-white  px-5">
      {children}
    </div>
  );
};

export default ContainerOnlyHeadBar;
