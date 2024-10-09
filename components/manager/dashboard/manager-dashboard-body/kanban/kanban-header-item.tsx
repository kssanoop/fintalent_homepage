import { ReactNode } from "react";

const KanbanHeaderItem = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-base font-medium tracking-[-0.32px] text-[#5E5E5E]">
      {children}
    </p>
  );
};

KanbanHeaderItem.Label = Label;

const Value = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-base font-bold tracking-[-0.32px] text-[#171717]">
      {children}
    </div>
  );
};

KanbanHeaderItem.Value = Value;

export default KanbanHeaderItem;
