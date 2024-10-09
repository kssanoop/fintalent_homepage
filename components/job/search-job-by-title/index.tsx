import SearchBar from "@/components/search-bar/search-bar";
import React from "react";

export type SearchJobByTitleProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: React.HTMLProps<HTMLElement>["className"];
    handleSearchQuery: (inputValue: string) => void;
    placeholderText: string;
  };

const SearchJobByTitle = ({
  className,
  handleSearchQuery,
  placeholderText,
}: SearchJobByTitleProps) => {
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
      placeholder={placeholderText}
      className="h-[38px] w-full px-4 py-2 md:w-1/2"
    />
  );
};

export default SearchJobByTitle;
