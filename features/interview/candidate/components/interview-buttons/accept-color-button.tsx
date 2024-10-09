import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

interface AcceptColorButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}

const AcceptColorButton = ({
  title,
  onClick,
  disabled = false,
  children,
  className,
}: AcceptColorButtonProps) => {
  return (
    <Button
      disabled={disabled}
      className={`${className} border border-border text-sm font-bold`}
      variant={"success"}
      onClick={onClick}
    >
      {children && <span>{children}</span>} {title}
    </Button>
  );
};

export default AcceptColorButton;
