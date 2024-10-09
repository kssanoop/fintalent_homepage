import React from "react";

export const useDebouncedvalue = (delay = 1500) => {
  const [value, setValue] = React.useState("");

  const debounceValue = (newValue: string) => {
    setTimeout(() => {
      setValue(newValue);
    }, delay);
  };

  return { value, debounceValue };
};
