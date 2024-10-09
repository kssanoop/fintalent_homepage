import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { jobPreferences } from "../Schema/job-Preference-schema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUpdateobPreference } from "../api/editJobPreference";
import { Loader2 } from "lucide-react";
// import ReactSelect, { components } from "react-select";
// import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { MenuList } from "@/components/menu-list";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { NOTICE_PERIOD } from "@/features/auth/candidate/login/components/basic-details";
import MultiSelectInput from "@/components/layout/multi-select-input";
import {
  employmentModeOptions,
  employmentTypeOptions,
  jobScheduleOptions,
} from "@/lib/constants/input-options";

const optionsToDropdownOptions = (options: typeof jobScheduleOptions) => {
  return options.map((option) => ({
    label: option.name,
    value: option.slug,
  }));
};

export const preferredShiftOptions = optionsToDropdownOptions(jobScheduleOptions);

const employmentOptions = optionsToDropdownOptions(employmentTypeOptions);

const modeOfEmploymentOptions = optionsToDropdownOptions(employmentModeOptions);
interface JobPereferenceEditFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobPreference: any;
}
const JobPereferenceEditForm = ({
  jobPreference,
  setOpen,
}: JobPereferenceEditFormProps) => {
  // console.log("job data", jobPreference);
  // handle Type Input of trigger error
  type FormFieldName =
    | "location"
    | "shift"
    | "employmentMode"
    | "employmentType"
    | "expectedCTC"
    | "currentCTC"
    | "noticePeriod";

  // extracting values
  const {
    currentCTC,
    employmentType,
    expectedCTC,
    location,
    employmentMode,
    noticePeriod,
    shift,
  } = jobPreference;

  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );

  //  form hook
  const form = useForm<jobPreferences>({
    defaultValues: {
      currentCTC,
      employmentType,
      expectedCTC,
      location,
      employmentMode,
      noticePeriod,
      shift,
    },
  });

  const queryClient = useQueryClient();

  // handle form submit success
  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
  };

  // handle form submit error
  const handleError = (error: any) => {
    toast.error(error.response.data.message);
  };

  //  submit form hook
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useUpdateobPreference(handleSuccess, handleError);

  // handle submit form function
  const onSubmit: SubmitHandler<jobPreferences> = (values) => {
    let locationData;

    if (Array.isArray(values.location)) {
      locationData = values.location;
    } else if (typeof values.location === "string") {
      locationData = [values.location];
    }

    const updatedData = {
      ...values,
      location: locationData,
      expectedCTC: Number(values.expectedCTC),
      currentCTC: Number(values.currentCTC),
      // noticePeriod: values.noticePeriod,
      // shift: values.shift.map((item: any) => item.value),
      // employmentType: values.employmentType,
      // employmentMode: values.employmentMode,
    };

    const jobPreferencesData = {
      jobPreferences: updatedData,
    };
    mutate(jobPreferencesData);
  };

  // // employment Type options dropdown
  // const employmentOptions = [
  //   { value: "fullTime", label: "Full Time" },
  //   { value: "internship", label: "Internship" },
  //   { value: "contractual", label: "Contract" },
  // ];
  // const Option = (props: any) => {
  //   return (
  //     <div>
  //       <components.Option {...props}>
  //         <div className="flex items-center gap-1">
  //           <Input
  //             type="checkbox"
  //             checked={props.isSelected}
  //             onChange={() => null}
  //             className="h-4 w-4"
  //           />{" "}
  //           <label
  //             className={`whitespace-nowrap text-base font-semibold ${
  //               props.isSelected ? "text-[#171717]" : "text-[#5E5E5E]"
  //             }`}
  //           >
  //             {props.label}
  //           </label>
  //         </div>
  //       </components.Option>
  //     </div>
  //   );
  // };

  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };

  const validateCurrentCTC = (value: number, values: jobPreferences) => {
    const expectedCTC = parseFloat(String(values.expectedCTC));
    if (value > expectedCTC) {
      return "Current CTC must be less than or equal to Expected CTC";
    }
    return true;
  };

  const validateExpectedCTC = (value: number, values: jobPreferences) => {
    const currentCTC = parseFloat(String(values.currentCTC));
    if (value < currentCTC) {
      return "Expected CTC must be greater than or equal to Current CTC";
    }
    return true;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="hide-scrollbar scroll-container flex max-h-[500px] w-full flex-col gap-4 overflow-auto px-1">
          {/* <FormField
            control={form.control}
            rules={{
              required: {
                value: true,
                message: "Location is a required field",
              },
              pattern: {
                value: /^([a-zA-Z]+, )*[a-zA-Z]+$/,
                message: "Enter Valid location",
              },
            }}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Preferred location</FormLabel>
                  <FormControl>
                    <Input
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.location && "shake"
                      }`}
                      {...field}
                      onChange={(e) => {
                        onInputChange("location", e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Controller
            name="location"
            rules={{
              required: {
                value: true,
                message: "Location is a required field",
              },
              pattern: {
                value: /^([a-zA-Z]+, )*[a-zA-Z]+$/,
                message: "Enter Valid location",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Preferred location</FormLabel>
                  {/* <ReactSelect
                    value={
                      field.value
                        ? citiesOptions?.filter((city: any) =>
                            Array.isArray(field.value)
                              ? field.value.includes(city.value)
                              : field.value === city.value,
                          )
                        : null
                    }
                    // onChange={(newValue: any) => {
                    //   console.log(newValue);
                    //   if (newValue === null) {
                    //     field.onChange("");
                    //     return;
                    //   }
                    //   field.onChange(newValue.value);
                    // }}
                    onChange={(selectedOptions) => {
                      const selectedValues = Array.isArray(selectedOptions)
                        ? selectedOptions.map((option) => option.value)
                        : selectedOptions
                          ? [selectedOptions.values]
                          : [];
                      field.onChange(selectedValues);
                    }}
                    options={citiesOptions}
                    isMulti
                    // @ts-ignore
                    itemSize={() => 49}
                    components={{ MenuList }}
                    isClearable
                    isLoading={isCitiesLoading}
                    placeholder="Select location"
                    styles={{
                      control: () => ({
                        width: "100%",
                        backgroundColor: "white",
                      }),
                    }}
                    classNames={classNameForReactSelect}
                  /> */}

                  <MultiSelectInput
                    options={citiesOptions || []}
                    placeholder="Select locations"
                    height={48}
                    isLoading={isCitiesLoading}
                    // @ts-ignore
                    itemSize={() => 49}
                    components={{ MenuList }}
                    value={
                      citiesOptions?.filter((item: any) =>
                        field.value.includes(item.value),
                      ) || []
                    }
                    onChange={(value: any) => {
                      field.onChange(value.map((item: any) => item.value));
                    }}
                  />
                </div>
                {form.formState.errors?.location && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors?.location.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedCTC"
            rules={{
              required: {
                value: true,
                message: "Expected CTC is required",
              },
              validate: {
                greaterThanCurrentCTC: validateExpectedCTC,
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Expected CTC</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        min={0}
                        type="number"
                        step="any"
                        className={`h-12 rounded-[5px] px-2 py-1 ${
                          form.formState.errors.expectedCTC && "shake"
                        }`}
                        {...field}
                        onChange={(e) => {
                          onInputChange("expectedCTC", e.target.value);
                        }}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(
                            /[^\d.]/g,
                            "",
                          );
                        }}
                      />
                      <div className="absolute bottom-1 right-3 top-2 text-base font-normal text-[#A9A9A9]">
                        LPA
                      </div>
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentCTC"
            rules={{
              required: {
                value: true,
                message: "Current CTC is required",
              },
              validate: {
                lessThanExpectedCTC: validateCurrentCTC,
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Current CTC</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        // pattern="[1-9]\d*"
                        className={`h-12 rounded-[5px] px-2 py-1 ${
                          form.formState.errors.currentCTC && "shake"
                        }`}
                        min={0}
                        step="any"
                        // maxLength={4}
                        {...field}
                        onChange={(e) => {
                          onInputChange("currentCTC", e.target.value);
                        }}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(
                            /[^\d.]/g,
                            "",
                          );
                        }}
                      />
                      <div className=" absolute bottom-1 right-3 top-2 text-base font-normal text-[#A9A9A9]">
                        LPA
                      </div>
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shift"
            rules={{
              required: {
                value: true,
                message: "Shift is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Preferred shift</FormLabel>
                  <FormControl>
                    <MultiSelectInput
                      options={preferredShiftOptions || []}
                      placeholder="Select shifts"
                      height={48}
                      value={
                        preferredShiftOptions?.filter((item: any) =>
                          field.value.includes(item.value),
                        ) || []
                      }
                      onChange={(value: any) => {
                        field.onChange(value.map((item: any) => item.value));
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentType"
            rules={{
              required: {
                value: true,
                message: "Select least one employment type",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    {/* <span
                      className="d-inline-block"
                      data-toggle="popover"
                      data-trigger="focus"
                      data-content="Please select Employment mode"
                    >
                      <ReactSelect
                        options={employmentOptions}
                        isMulti
                        className={
                          form.formState.errors.employmentType && "shake"
                        }
                        styles={{
                          option: (provided) => ({
                            ...provided,
                            color: "#333",
                            background: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }),
                        }}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                        }}
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map(
                            (option) => option.value,
                          );
                          form.setValue("employmentType", selectedValues);
                        }}
                        defaultValue={employmentOptions.filter((option) =>
                          field.value.includes(option.value),
                        )}
                      />
                    </span> */}

                    <MultiSelectInput
                      options={employmentOptions || []}
                      placeholder="Select employment type"
                      height={48}
                      value={
                        employmentOptions?.filter((item: any) =>
                          field.value.includes(item.value),
                        ) || []
                      }
                      onChange={(value: any) => {
                        field.onChange(value.map((item: any) => item.value));
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentMode"
            rules={{
              required: {
                value: true,
                message: "Employment mode is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel>On site/remote</FormLabel>
                  <FormControl>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <SelectTrigger
                        className={`h-10 text-base font-normal text-[#A9A9A9] ${
                          form.formState.errors.employmentMode && "shake"
                        }`}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent
                        side="bottom"
                        className="p-0 text-base font-medium text-[#171717]"
                      >
                        <SelectItem value="onSite" key={1}>
                          On site
                        </SelectItem>
                        <SelectItem value="remote" key={2}>
                          Remote
                        </SelectItem>
                        <SelectItem value="hybrid" key={3}>
                          Hybrid
                        </SelectItem>
                      </SelectContent>
                    </Select> */}

                    <MultiSelectInput
                      options={modeOfEmploymentOptions || []}
                      placeholder="Select"
                      height={48}
                      value={
                        modeOfEmploymentOptions?.filter((item: any) =>
                          field.value.includes(item.value),
                        ) || []
                      }
                      onChange={(value: any) => {
                        field.onChange(value.map((item: any) => item.value));
                      }}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noticePeriod"
            rules={{
              required: {
                value: true,
                message: "Notice period is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="mb-2 flex flex-col gap-1">
                  <FormLabel>Notice period</FormLabel>
                  <FormControl>
                    {/* <Input
                      type="text"
                      pattern="[1-9]\d*"
                      className={`h-10 rounded-[5px] px-2 py-1 ${
                        form.formState.errors.noticePeriod && "shake"
                      }`}
                      min="0"
                      step="1"
                      maxLength={2}
                      max="12"
                      {...field}
                      onChange={(e) => {
                        onInputChange("noticePeriod", e.target.value);
                      }}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    /> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NOTICE_PERIOD.map((period) => (
                          <SelectItem
                            value={period.value}
                            key={crypto.randomUUID()}
                          >
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* button */}
        <div className="flex justify-end gap-4 pt-2">
          <Button
            type="button"
            variant={"outline"}
            className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          {isSubmitting && !isSubmitionError ? (
            <Button disabled variant={"gradient"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button type="submit" variant="gradient" className="w-[85px]">
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default JobPereferenceEditForm;
