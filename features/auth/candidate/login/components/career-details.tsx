import React, { useEffect, useMemo } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/utils/format-date";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { MenuList } from "@/components/menu-list";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";
import {
  educationLevelOptions,
  employmentTypeOptions,
} from "@/lib/constants/input-options";

const getCities = (cities: any) => {
  if (cities) {
    return generateOptions(cities);
  }
};

const CareerForm = ({ form }: stepForm) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(() => getCities(cities), [cities]);

  const { data: qualifications } = useGetQualifications();

  useEffect(() => {
    // Disable body scroll when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <h3 className="mb-5 mt-12 text-sm font-semibold text-muted-foreground">
        WORK HISTORY
      </h3>
      <div className="mb-6 flex flex-col gap-x-8 gap-y-6 md:flex-row">
        <FormField
          control={form.control}
          name="employmentDetails.0.companyName"
          rules={{
            required: {
              value: true,
              message: "Company Name is required",
            },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Company name*</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: ABC International"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentDetails.0.jobTitle"
          rules={{
            required: {
              value: true,
              message: "Company Name is required",
            },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Job Title*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="eg: Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mb-6 flex flex-col gap-x-8 gap-y-6 md:flex-row">
        <FormField
          control={form.control}
          name="employmentDetails.0.employmentType"
          rules={{
            required: {
              value: true,
              message: "Employment Type is required",
            },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Employment Type*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  style={{ maxHeight: "100px", overflowY: "hidden" }}
                >
                  {employmentTypeOptions.map((option) => (
                    <SelectItem key={option.slug} value={option.slug}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="employmentDetails.0.jobLocation"
          rules={{
            required: { value: true, message: "Location is required" },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Job Location*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="eg: Cochin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Controller
          name="employmentDetails.0.jobLocation"
          rules={{
            required: { value: true, message: "Location is required" },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Job Location*</FormLabel>
              <ReactSelect
                value={field.value.value}
                onChange={(newValue: any) => {
                  if (newValue === null) {
                    field.onChange("");
                    return;
                  }
                  field.onChange(newValue.value);
                }}
                // @ts-ignore
                itemSize={() => 49}
                components={{ MenuList }}
                options={citiesOptions}
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
              />
              {form.formState.errors?.employmentDetails?.[0]?.jobLocation && (
                <p className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors?.employmentDetails?.[0]?.jobLocation
                      .message
                  }
                </p>
              )}
            </FormItem>
          )}
        />
      </div>

      {/* calendar code, commented due to build error */}
      <div className="mb-6 flex flex-col gap-x-8 gap-y-6 md:flex-row">
        <FormField
          control={form.control}
          name="employmentDetails.0.startDate"
          rules={{
            required: { value: true, message: "Start Date is required" },
          }}
          render={({ field }) => (
            <FormItem className="flex flex-grow flex-col md:w-1/2">
              <FormLabel>Start Date*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full bg-white pl-3 text-left font-normal",
                        !field.value && "border-input text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Start Date</span>
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
                      form.setValue(
                        "employmentDetails.0.startDate",
                        formatDate(value),
                      );
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

        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="employmentDetails.0.endDate"
            rules={{
              required: {
                value: !form.watch("employmentDetails.0.currentlyWorkingHere"),
                message: "End Date is required",
              },
              // validate: () => {
              //   return (
              //     form.watch("employmentDetails.0.currentlyWorkingHere") ||
              //     "End Date is required"
              //   );
              // },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>
                  End Date
                  {!form.watch("employmentDetails.0.currentlyWorkingHere") &&
                    "*"}
                </FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    disabled={form.watch(
                      "employmentDetails.0.currentlyWorkingHere",
                    )}
                  >
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "border-input bg-white pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>End Date</span>
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
                        if (value) {
                          const formattedDate = format(value, "yyyy-MM-dd");
                          form.setValue(
                            "employmentDetails.0.endDate",
                            formattedDate,
                          );
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() ||
                        date < new Date("1900-01-01") ||
                        date <
                          new Date(form.watch("employmentDetails.0.startDate"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentDetails.0.currentlyWorkingHere"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    className="h-[18px] w-[18px]"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel className="font-medium">
                    I&apos;m currently working here
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="employmentDetails.0.summary"
        rules={{
          required: {
            value: true,
            message: "Summary is required",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary*</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Detail more about your responsibilities"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h3 className="mb-7 mt-11 text-sm font-semibold text-muted-foreground">
        EDUCATION DETAILS
      </h3>
      <div className="mb-6 flex flex-col gap-x-8 gap-y-6 md:flex-row">
        <FormField
          control={form.control}
          name="educationDetails.0.educationLevel"
          rules={{
            required: {
              value: true,
              message: "Education Level is required",
            },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>Education Level*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {educationLevelOptions.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educationDetails.0.instituteName"
          rules={{
            required: {
              value: true,
              message: "Institution Name is required",
            },
          }}
          render={({ field }) => (
            <FormItem className="md:w-1/2">
              <FormLabel>School/ Univeristy*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="ABC College" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        rules={{
          required: {
            value: true,
            message: "Course Name is required",
          },
        }}
        name="educationDetails.0.courseName"
        render={({ field }) => (
          <FormItem className="mb-6 md:w-1/2">
            <FormLabel>Course Name*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {qualifications?.map((qualification) => (
                  <SelectItem key={crypto.randomUUID()} value={qualification}>
                    {qualification}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* calendar code, commented due to bugs */}
      <div className="mb-6 flex flex-col gap-x-8 gap-y-6 md:flex-row">
        <FormField
          control={form.control}
          rules={{
            required: {
              value: true,
              message: "Start Date is required",
            },
          }}
          name="educationDetails.0.startDate"
          render={({ field }) => (
            <FormItem className="flex flex-grow flex-col md:w-1/2">
              <FormLabel>Start Date*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "border-input bg-white pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
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
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(value) => {
                      form.setValue(
                        "educationDetails.0.startDate",
                        formatDate(value),
                      );
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

        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="educationDetails.0.endDate"
            disabled={form.watch("educationDetails.0.currentlyStudyingHere")}
            rules={{
              required: {
                value: !form.watch("educationDetails.0.currentlyStudyingHere"),
                message: "End Date is required",
              },
              // validate: () => {
              //   return (
              //     form.watch("educationDetails.0.currentlyStudyingHere") ||
              //     "End Date is required"
              //   );
              // },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>
                  End Date
                  {!form.watch("educationDetails.0.currentlyStudyingHere") &&
                    "*"}
                </FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    disabled={form.watch(
                      "educationDetails.0.currentlyStudyingHere",
                    )}
                  >
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "border-input bg-white pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
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
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(value) => {
                        form.setValue(
                          "educationDetails.0.endDate",
                          formatDate(value),
                        );
                      }}
                      disabled={(date) =>
                        date > new Date() ||
                        date < new Date("1900-01-01") ||
                        date <
                          new Date(form.watch("educationDetails.0.startDate"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="educationDetails.0.currentlyStudyingHere"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    className="h-[18px] w-[18px]"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel className="font-medium">
                    I&apos;m currently studying here
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CareerForm;
