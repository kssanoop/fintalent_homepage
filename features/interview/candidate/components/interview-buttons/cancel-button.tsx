import { Button } from "@/components/ui/button";
import React from "react";

interface CancelButtonProps {
  onClick: () => void;
  title: string;
}

const CancelButton = ({ onClick, title }: CancelButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="border border-border bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CancelButton;
