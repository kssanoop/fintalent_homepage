import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

interface RejectColorButtonProps {
  title: string;
  onClick?: () => void;
  children?: ReactNode;
}

const RejectColorButton = ({
  title,
  onClick,
  children,
}: RejectColorButtonProps) => {
  return (
    <Button
      className=" bg-[#E72F2F] text-base font-bold"
      variant={"secondary"}
      onClick={onClick}
    >
      {children} {title}
    </Button>
  );
};

export default RejectColorButton;
