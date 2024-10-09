import React, { ButtonHTMLAttributes } from "react";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton: React.FC<StyledButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="gradient-button rounded-[5px] px-[32px] py-[12px] text-[18px] font-[700] text-white "
    >
      {children}
    </button>
  );
};

export default StyledButton;
