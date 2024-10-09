import { X } from "lucide-react";
import React from "react";

interface RejectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const RejectButton = ({ text, ...props }: RejectButtonProps) => {
  return (
    <button
      {...props}
      className="flex items-center rounded-[4px] bg-[#ED6464] p-2.5 text-sm font-bold text-white"
    >
      <span className="flex items-center gap-2.5">
        {" "}
        <p>{text}</p> <X color="#FFF" width={18} height={18} />
      </span>
    </button>
  );
};

export default RejectButton;
