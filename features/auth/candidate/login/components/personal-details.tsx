import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/utils/cnHelper";

import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { stepForm } from "../../schemas/profile-schema";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactSelect from "react-select";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/format-date";
import { Controller } from "react-hook-form";
import useGetAllCountries from "@/features/get-location/api/get-all-countries";
import useGetStates from "@/features/get-location/api/get-states-by-country";
import { Country } from "@/features/get-location/type/country";
import useGetCities from "@/features/get-location/api/get-cities-by-country-and-state";

const generateOptions = (data: Country[]) =>
  data?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

const classNameForReactSelect = {
  control: (state: any) =>
    `${
      state.isFocused &&
      "!border-ring !border-[#E1E1E1] !ring-offset-background !ring-ring !outline-none !ring-2 !ring-ring !ring-offset-2 "
    } flex h-12 w-full rounded-md border border-[#E1E1E1] border-input bg-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
  indicatorSeparator: () => "hidden",
  placeholder: () => "!text-brand-black",
};
const PersonalDetailsForm = ({ form }: stepForm) => {
  const { data: countries, isLoading: isCountryLoading } = useGetAllCountries();
  const countriesOptions = countries && generateOptions(countries);
  const getSelectedCountryId = (selectedCountry: string | undefined) => {
    if (countries && selectedCountry) {
      return countries.find((country) => country.name === selectedCountry)
        ?.iso2;
    }
  };

  const getSelectedStateId = (selectedState: string | undefined) => {
    if (states && selectedState) {
      return states.find((state) => state.name === selectedState)?.iso2;
    }
  };
  // const selectedCountryId = countries.find(
  //   (country) => country.name === form.watch("personalDetails.country"),
  // ).iso2;
  console.log(getSelectedCountryId(form.watch("personalDetails.country")));
  const { data: states, isFetching: isStatesLoading } = useGetStates({
    countryId: getSelectedCountryId(form.watch("personalDetails.country")),
  });
  const statesOptions = states && generateOptions(states);

  const { data: cities, isFetching: isCitiesLoading } = useGetCities({
    countryId: getSelectedCountryId(form.watch("personalDetails.country")),
    stateId: getSelectedStateId(form.watch("personalDetails.state")),
  });

  const citiesOptions = cities && generateOptions(cities);
  console.log(citiesOptions); // useEffect(() => {
  //   if (form.watch("personalDetails.country")) {
  //     console.log("called");
  //     form.resetField("personalDetails.state");
  //   }
  // }, [form.watch("personalDetails.country"), form]);
  // console.log(form.watch("personalDetails.state"));

  return (
    <>
      <div className="mb-6 mt-8 flex gap-x-8">
        <FormField
          control={form.control}
          name="personalDetails.gender"
          rules={{
            required: { value: true, message: "Gender is required" },
          }}
          render={({ field }) => (
            <FormItem className=" w-1/2">
              <FormLabel>Gender*</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalDetails.dob"
          render={({ field }) => (
            <FormItem className="flex w-1/2 flex-grow flex-col">
              <FormLabel className="mb-2">Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-12 w-full border-input bg-white pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground ",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    // captionLayout="dropdown"
                    // fromYear={1500} toYear={new Date().getFullYear()}
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(value) => {
                      form.setValue("personalDetails.dob", formatDate(value));
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mb-6 flex gap-x-8">
        {/* <FormField
          control={form.control}
          name="personalDetails.state"
          render={({ field }) => (
            <FormItem className=" w-1/2">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Kerala" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="personalDetails.state"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>State</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value,
                          )?.label
                        : "Select State"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    {!form.watch("personalDetails.country") ? (
                      <p>Select the country first</p>
                    ) : (
                      <>
                        <CommandInput placeholder="Search country" />
                        <CommandEmpty>No States found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue(
                                  "personalDetails.state",
                                  language.value,
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="personalDetails.country"
          render={({ field }) => (
            <FormItem className=" w-1/2">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input type="text" placeholder="India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="personalDetails.country"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value,
                          )?.label
                        : "Select country"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country" />
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue(
                              "personalDetails.country",
                              language.value,
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Controller
          name="personalDetails.country"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Country</FormLabel>
              <ReactSelect
                value={countriesOptions?.find(
                  (option) => option.value === field.value,
                )}
                // inputValue={field.value}
                onChange={(newValue: any) => {
                  console.log(newValue);
                  field.onChange(newValue.value);
                }}
                // onInputChange={(inputValue: any) => {
                //   console.log(inputValue)
                //   field.onChange(inputValue.value);
                // }}

                options={countriesOptions}
                isLoading={isCountryLoading}
                placeholder="Select Country"
                classNames={classNameForReactSelect}
              />
            </FormItem>
          )}
        />

        <Controller
          name="personalDetails.state"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>State</FormLabel>
              <ReactSelect
                // value={() => {
                //   console.log( form.watch("personalDetails.state"))
                //   form.watch("personalDetails.state");
                // }}
                value={field.value.value}
                onChange={(newValue: any) => {
                  console.log(newValue);
                  field.onChange(newValue.value);
                }}
                // onInputChange={(inputValue: any) => {
                //   field.onChange(inputValue.value);
                // }}
                options={statesOptions}
                isLoading={isStatesLoading}
                placeholder="Select State"
                classNames={classNameForReactSelect}
              />
            </FormItem>
          )}
        />
      </div>

      {/* calendar code, commented due to build error */}
      <div className="mb-6 flex gap-x-8">
        {/* <FormField
          control={form.control}
          name="personalDetails.city"
          render={({ field }) => (
            <FormItem className=" w-1/2">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="eg: Kochi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Controller
          name="personalDetails.city"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>City</FormLabel>
              <ReactSelect
                // value={() => {
                //   console.log( form.watch("personalDetails.state"))
                //   form.watch("personalDetails.state");
                // }}
                value={field.value.value}
                onChange={(newValue: any) => {
                  console.log(newValue);
                  field.onChange(newValue.value);
                }}
                // onInputChange={(inputValue: any) => {
                //   field.onChange(inputValue.value);
                // }}
                options={citiesOptions}
                isLoading={isCitiesLoading}
                placeholder="Select City"
                classNames={classNameForReactSelect}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalDetails.pincode"
          rules={{
            minLength: { value: 6, message: "Pincode should be 6 digits" },
            maxLength: { value: 6, message: "Pincode should be 6 digits" },
          }}
          render={({ field }) => (
            <FormItem className=" w-1/2">
              <FormLabel>Pin Code</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="695009"
                  {...field}
                  minLength={6}
                  maxLength={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="personalDetails.addressLine1"
        rules={{
          required: { value: true, message: "Address is required" },
        }}
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>Address Line 1*</FormLabel>
            <FormControl>
              <Input
                type="text"
                {...field}
                placeholder="East AL Jacob bridge"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.addressLine2"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input
                type="text"
                {...field}
                placeholder="East AL Jacob bridge"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalDetailsForm;
