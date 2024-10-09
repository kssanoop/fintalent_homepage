import React from "react";
import ReactSelect from "react-select";

interface MultiSelectInputProps {
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  height?: number;
  [key: string]: any;
}
const MultiSelectInput = ({
  options,
  placeholder,
  height,
  ...props
}: MultiSelectInputProps) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "auto",
      minHeight: height,
      border: state.isFocused ? "1px solid #034A9A" : provided.border,
      borderRadius: 5,
    }),
    multiValue: (provided: any) => ({
      ...provided,
      borderRadius: "24px",
      backgroundColor: "#FFF",
      border: "1px solid #D8D8D8",
      text: "#818181",
      textSize: "14px",
      fontWeight: "600",
      padding: "3px 6px",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      borderRadius: "50%",
      color: "#656565",
      "&:hover": {
        backgroundColor: "#FFF",
      },
    }),
  };
  return (
    <ReactSelect
      isMulti
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      {...props}
      maxMenuHeight={200}
    />
  );
};

export default MultiSelectInput;
