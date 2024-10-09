import React, { Dispatch, SetStateAction } from "react";
import { PersonalDetail } from "../Schema/PersonalSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAddData } from "../../WorkHistory/api/updateWorkHistory";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cnHelper";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/format-date";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactSelect from "react-select";
import useGetAllCountries from "@/features/get-location/api/get-all-countries";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import useGetStates from "@/features/get-location/api/get-states-by-country";
import useGetCities from "@/features/get-location/api/get-cities-by-country-and-state";

type FormFieldName =
  | "state"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "country"
  | "pincode";
interface PersonalDetailsFormProps {
  personalDetails: PersonalDetail;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PersonalDetailsForm = ({
  personalDetails,
  setOpen,
}: PersonalDetailsFormProps) => {
  const defaultValuesForms = {
    gender: personalDetails.gender,
    dob: personalDetails.dob,
    state: personalDetails.state,
    country: personalDetails.country,
    city: personalDetails.city,
    pincode: personalDetails.pincode,
    addressLine1: personalDetails.addressLine1,
    addressLine2: personalDetails.addressLine2,
  };
  const form = useForm<PersonalDetail>({
    defaultValues: defaultValuesForms,
  });

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

  const { data: states, isFetching: isStatesLoading } = useGetStates({
    countryId: getSelectedCountryId(form.watch("country")),
  });
  const statesOptions = states && generateOptions(states);

  const { data: cities, isFetching: isCitiesLoading } = useGetCities({
    countryId: getSelectedCountryId(form.watch("country")),
    stateId: getSelectedStateId(form.watch("state")),
  });

  const citiesOptions = cities && generateOptions(cities);

  const queryClient = useQueryClient();

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddData(handleSuccess, handleError);

  const onSubmit: SubmitHandler<PersonalDetail> = (values) => {
    const PersonalDetailsData = {
      personalDetails: values,
    };
    mutate(PersonalDetailsData);
  };

  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col gap-4 overflow-auto px-1 ">
          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            rules={{
              required: {
                value: true,
                message: "select a gender",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`h-10 ${
                            form.formState.errors.gender && "shake"
                          }`}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* DOB */}
          <FormField
            control={form.control}
            name="dob"
            rules={{
              required: {
                value: true,
                message: "DOB field is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    DOB
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-white pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>DOB</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(value) => {
                          form.setValue("dob", formatDate(value));
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/*  Country */}
          {/* <FormField
            control={form.control}
            name="country"
            rules={{
              required: {
                value: true,
                message: "Country is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z\s().]*$/,
                message: "Invalid Country name format",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.country && "shake"
                      }`}
                      onChange={(e) => {
                        onInputChange("country", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Controller
            name="country"
            rules={{
              required: {
                value: true,
                message: "Country is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Country
                </FormLabel>
                <ReactSelect
                  value={field.value.value}
                  defaultInputValue={field.value}
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
                {form.formState.errors?.country && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors?.country.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* State */}
          {/* <FormField
            control={form.control}
            name="state"
            rules={{
              required: {
                value: true,
                message: "State is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z\s().]*$/,
                message: "Invalid State name format",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.state && "shake"
                      }`}
                      onChange={(e) => {
                        onInputChange("state", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Controller
            name="state"
            rules={{
              required: {
                value: true,
                message: "State is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <FormLabel className="text-base font-semibold text-[#171717]">
                  State
                </FormLabel>
                <ReactSelect
                  defaultInputValue={field.value}
                  value={field.value.value}
                  onChange={(newValue: any) => {
                    console.log(newValue);
                    field.onChange(newValue.value);
                  }}
                  options={statesOptions}
                  isLoading={isStatesLoading}
                  placeholder="Select State"
                  classNames={classNameForReactSelect}
                />
                {form.formState.errors?.state && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors?.state.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* City */}
          {/* <FormField
            control={form.control}
            name="city"
            rules={{
              required: {
                value: true,
                message: "City is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z\s().]*$/,
                message: "Invalid City name format",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.city && "shake"
                      }`}
                      onChange={(e) => {
                        onInputChange("city", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Controller
            name="city"
            rules={{
              required: { value: true, message: "City is required" },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <FormLabel className="text-base font-semibold text-[#171717]">
                  city{" "}
                </FormLabel>
                <ReactSelect
                  defaultInputValue={field.value}
                  value={field.value.value}
                  onChange={(newValue: any) => {
                    field.onChange(newValue.value);
                  }}
                  options={citiesOptions}
                  isLoading={isCitiesLoading}
                  placeholder="Select City"
                  classNames={classNameForReactSelect}
                />
                {form.formState.errors?.city && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors?.city.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* PIN code */}

          <FormField
            control={form.control}
            name="pincode"
            rules={{
              required: {
                value: true,
                message: "PIN Code is required",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "Invalid Pincode format",
              },
              maxLength: {
                value: 6,
                message: "Invalid Pincode format",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    PIN code
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      pattern="[1-9]\d*"
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.pincode && "shake"
                      }`}
                      {...field}
                      onChange={(e) => {
                        onInputChange("pincode", e.target.value);
                      }}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address line 1 */}

          <FormField
            control={form.control}
            name="addressLine1"
            rules={{
              required: {
                value: true,
                message: "Address line 1 is required",
              },
              pattern: {
                value: /^(?!.*\.\d+).*/gm,
                message: "No decimal number allowed in addressline1",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    Address line 1
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={`min-h-[96px] resize-none rounded-[5px] px-2 py-1  ${
                        form.formState.errors.addressLine1 && "shake"
                      }`}
                      onChange={(e) => {
                        onInputChange("addressLine1", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address line 2 */}
          <FormField
            control={form.control}
            name="addressLine2"
            rules={{
              required: {
                value: true,
                message: "Address line 2 is required",
              },
              pattern: {
                value: /^(?!.*\.\d+).*/gm,
                message: "No decimal number allowed in addressline2",
              },
            }}
            render={({ field }) => (
              <FormItem className="p-0">
                <div className="mb-2 flex flex-col gap-1">
                  <FormLabel className="text-base font-semibold text-[#171717]">
                    Address line 2
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={`min-h-[96px] resize-none rounded-[5px] px-2 py-1  ${
                        form.formState.errors.addressLine2 && "shake"
                      }`}
                      onChange={(e) => {
                        onInputChange("addressLine2", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* button */}
        <div className="flex justify-end gap-4 pt-2">
          <div>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setOpen(false);
              }}
              className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
            >
              Cancel
            </Button>
          </div>
          <div>
            {isSubmitting && !isSubmitionError ? (
              <Button disabled variant={"gradient"}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Editing...
              </Button>
            ) : (
              <Button type="submit" variant="gradient" className="w-[85px]">
                Save
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PersonalDetailsForm;
