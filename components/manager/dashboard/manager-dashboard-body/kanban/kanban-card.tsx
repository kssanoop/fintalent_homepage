import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cnHelper";
import { ReactNode } from "react";

const KanbanCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn("h-[446px] min-w-[273px] rounded-[8px]", className)}>
      {children}
    </Card>
  );
};

const KanbanHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-12 justify-between rounded-t-[8px] bg-[#3A37E3] p-3 text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

KanbanCard.Header = KanbanHeader;

const KanbanTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h5
      className={cn(
        "text-base font-bold tracking-[-0.32px] text-white",
        className,
      )}
    >
      {children}
    </h5>
  );
};

KanbanCard.Title = KanbanTitle;

const Body = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-1 p-3", className)}>{children}</div>
  );
};

KanbanCard.Body = Body;

export default KanbanCard;
