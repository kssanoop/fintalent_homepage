import SearchBar from "@/components/search-bar/search-bar";
import React from "react";

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: React.HTMLProps<HTMLElement>["className"];
  handleSearchQuery: (inputValue: string) => void;
  placeholder?: string;
};

const SearchBarStateHolder = ({
  className,
  handleSearchQuery,
  placeholder,
}: Props) => {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
    handleSearchQuery(e.target.value);
  };

  return (
    <SearchBar
      value={searchBarValue}
      onChange={handleChange}
      isSearchIconVisible={true}
      placeholder={placeholder}
      className="w-full md:w-1/2"
    />
  );
};

export default SearchBarStateHolder;
