import { cn } from "@/utils/cnHelper";
import { ReactNode } from "react";

type ChildrenClassProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const NotificationCard = ({
  children,
  className,
  onClick,
}: ChildrenClassProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "space-y-2 rounded-[5px] border-secondary bg-white px-5 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Title = ({ children, className }: ChildrenClassProps) => {
  return (
    <div className={cn("text-xs font-semibold text-brand-black", className)}>
      {children}
    </div>
  );
};

NotificationCard.Title = Title;

const Description = ({ children, className }: ChildrenClassProps) => {
  return (
    <div className={cn("text-sm text-brand-grey", className)}>{children}</div>
  );
};

NotificationCard.Description = Description;

export default NotificationCard;
