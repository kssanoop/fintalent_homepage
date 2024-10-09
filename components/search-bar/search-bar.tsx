import SearchIcon from "@/components/svg/SearchIcon";
import { cn } from "@/utils/cnHelper";
import React from "react";

export type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: React.HTMLProps<HTMLElement>["className"];
  placeholder?: string;
  isSearchIconVisible?: boolean;
};

const SearchBar = ({
  className,
  placeholder,
  isSearchIconVisible = true,
  ...props
}: SearchBarProps) => {
  return (
    // <div className="relative flex w-full">
    <div
      className={cn(
        "flex w-full items-center justify-between rounded border border-solid border-[#CDCDCD] bg-white   text-sm font-normal text-[#5E5E5E] placeholder:text-sm placeholder:font-normal  placeholder:text-[#5E5E5E]  focus:outline-none",
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        {...props}
        className="w-3/4 rounded px-4 py-2 focus-visible:outline-none"
      />
      {isSearchIconVisible && (
        <div className="mr-4">
          <SearchIcon />
        </div>
      )}
    </div>
    // </div>
  );
};

export default SearchBar;
