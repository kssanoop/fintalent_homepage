export const classNameForReactSelect = {
  control: (state: any) =>
    `${
      state.isFocused &&
      "!border-ring !border-[#E1E1E1] !ring-offset-background !ring-ring !outline-none !ring-2 !ring-ring !ring-offset-2 "
    } flex h-12 w-full rounded-md border border-[#E1E1E1] border-input  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
  indicatorSeparator: () => "hidden",
  placeholder: () => "!text-[#A9A9A9]",
};
