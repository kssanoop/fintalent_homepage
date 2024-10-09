import { cn } from "@/utils/cnHelper";
import { ReactNode } from "react";

const KanbanCardTotalItemsNumber = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#F7F7F7] px-1 py-[5px] text-sm font-bold tracking-[-0.28px] text-[#3A37E3]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default KanbanCardTotalItemsNumber;
