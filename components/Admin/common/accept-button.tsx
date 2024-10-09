import { Check } from "lucide-react";
import React, { ReactNode } from "react";

interface AcceptButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children?: ReactNode;
}

const AcceptButton = ({ text, children, ...props }: AcceptButtonProps) => {
  return (
    <button
      {...props}
      className="flex items-center rounded-[4px] bg-[#5ED678] p-2.5 text-sm font-bold text-white"
    >
      <span className="flex items-center gap-2.5">
        {children ? (
          <span className="flex items-center">
            {children}
            {text}
          </span>
        ) : (
          <span className="flex items-center gap-2.5">
            <p>{text}</p> <Check color="#FFF" width={18} height={18} />
          </span>
        )}
      </span>
    </button>
  );
};

export default AcceptButton;
