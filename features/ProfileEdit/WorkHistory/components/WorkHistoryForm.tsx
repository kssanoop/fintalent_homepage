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
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/utils/cnHelper";
import { Textarea } from "@/components/ui/textarea";
import { EmploymentHistory } from "../Schema/WorkHistorySchema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { formatDate } from "@/utils/format-date";
import { useAddData } from "../api/updateWorkHistory";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { MenuList } from "@/components/menu-list";
interface WorkHistoryFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  employmentDetails: any;
  isEdit: boolean;
  clickedIndex: number;
}
const WorkHistoryForm = ({
  setOpen,
  employmentDetails,
  isEdit,
  clickedIndex,
}: WorkHistoryFormProps) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );
  // const [isCurrentlyWorkingHere, setIsCurrentlyWorkingHere] = useState(false);
  // console.log("default", employmentDetails[1].companyName);
  const queryClient = useQueryClient();
  type FormFieldName =
    | "employmentDetails.0.companyName"
    | "employmentDetails.0.jobTitle"
    | "employmentDetails.0.employmentType"
    | "employmentDetails.0.jobLocation";
  // when form is in edit mode default form values
  const defaultValuesForms = isEdit
    ? {
        employmentDetails: [
          {
            companyName: employmentDetails[clickedIndex].companyName,
            jobTitle: employmentDetails[clickedIndex].jobTitle,
            employmentType: employmentDetails[clickedIndex].employmentType,
            jobLocation: employmentDetails[clickedIndex].jobLocation,
            startDate: employmentDetails[clickedIndex].startDate,
            endDate: employmentDetails[clickedIndex].endDate,
            currentlyWorkingHere:
              employmentDetails[clickedIndex].currentlyWorkingHere,
            summary: employmentDetails[clickedIndex].summary,
          },
        ],
      }
    : {
        employmentDetails: [
          {
            companyName: "",
            jobTitle: "",
            employmentType: "",
            jobLocation: "",
            startDate: "",
            endDate: "",
            currentlyWorkingHere: false,
            summary: "",
          },
        ],
      };

  // form hook
  const form = useForm<EmploymentHistory>({
    defaultValues: defaultValuesForms,
  });

  // form success submit

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data?.message);
  };

  // form error in  submission
  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  // data update  custom hook
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddData(handleSuccess, handleError);

  //  sending old data with new data
  const oldEmploymentDetails = {
    employmentDetails: employmentDetails.map((job: any) => {
      return {
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        employmentType: job.employmentType,
        jobLocation: job.jobLocation,
        currentlyWorkingHere: job.currentlyWorkingHere,
        summary: job.summary,
        startDate: formatDate(new Date(job.startDate)),
        ...(!job.currentlyWorkingHere && {
          endDate: formatDate(new Date(job.endDate)),
        }),
      };
    }),
  };

  // console.log("old data", oldEmploymentDetails);

  //  form submit handle
  const onSubmit: SubmitHandler<EmploymentHistory> = (values) => {
    const payload = {
      employmentDetails: [
        {
          companyName: values.employmentDetails[0].companyName,
          jobTitle: values.employmentDetails[0].jobTitle,
          employmentType: values.employmentDetails[0].employmentType,
          jobLocation: values.employmentDetails[0].jobLocation,
          startDate: formatDate(
            new Date(values.employmentDetails[0].startDate),
          ),
          ...(!values.employmentDetails[0].currentlyWorkingHere && {
            endDate: formatDate(new Date(values.employmentDetails[0].endDate)),
          }),
          currentlyWorkingHere:
            values.employmentDetails[0].currentlyWorkingHere,
          summary: values.employmentDetails[0].summary,
        },
      ],
    };

    if (isEdit) {
      // Handle edit mode
      const updatedDetails = [...oldEmploymentDetails.employmentDetails];
      updatedDetails[clickedIndex] = payload.employmentDetails[0];

      mutate({
        employmentDetails: updatedDetails,
      });
    } else {
      // Handle add mode
      const updatedDetails = [...oldEmploymentDetails.employmentDetails];
      updatedDetails.push(values.employmentDetails[0]);

      // Update the form data
      form.setValue("employmentDetails", updatedDetails);

      const employmentDetailsData = {
        employmentDetails: updatedDetails,
      };

      mutate(employmentDetailsData);
    }
  };

  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="hide-scrollbar scroll-container flex max-h-[500px] w-full flex-col gap-4 overflow-auto px-1">
          <FormField
            control={form.control}
            rules={{
              required: {
                value: true,
                message: "Company name is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s().]*$/,
                message: "Company name is in invalid format",
              },
            }}
            name={`employmentDetails.0.companyName`}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`h-10 rounded-[5px] px-2 py-1 ${
                      form?.formState?.errors?.employmentDetails?.[0]
                        ?.companyName && "shake"
                    }`}
                    onChange={(e) => {
                      onInputChange(
                        "employmentDetails.0.companyName",
                        e.target.value,
                      );
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{
              required: {
                value: true,
                message: "Job title is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s().]*$/,
                message: "Job title is in invalid format",
              },
            }}
            name="employmentDetails.0.jobTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`h-10 rounded-[5px] px-2 py-1 ${
                      form?.formState?.errors?.employmentDetails?.[0]
                        ?.jobTitle && "shake"
                    }`}
                    onChange={(e) => {
                      onInputChange(
                        "employmentDetails.0.jobTitle",
                        e.target.value,
                      );
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* employment type */}
          <FormField
            control={form.control}
            name="employmentDetails.0.employmentType"
            rules={{
              required: {
                value: true,
                message: "Employment type is Required",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Employment Type</FormLabel>
                <FormControl>
                  <div className="flex gap-14">
                    <div className="flex items-center space-x-1">
                      <Checkbox
                        id="employmentTypeFullTime"
                        className="h-4 w-4"
                        checked={Boolean(field.value === "Full Time")}
                        onCheckedChange={(isChecked) => {
                          field.onChange(isChecked ? "Full Time" : "");
                        }}
                      />
                      <label
                        htmlFor="employmentTypeFullTime"
                        className="text-base font-semibold text-[#171717]"
                      >
                        Full Time
                      </label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Checkbox
                        id="employmentTypeInternship"
                        className="h-4 w-4"
                        checked={Boolean(field.value === "Internship")}
                        onCheckedChange={(isChecked) => {
                          field.onChange(isChecked && "Internship");
                        }}
                      />
                      <label
                        htmlFor="employmentTypeInternship"
                        className="text-base font-semibold text-[#171717]"
                      >
                        Internship
                      </label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Checkbox
                        id="employmentTypeContract"
                        className="h-4 w-4"
                        checked={Boolean(field.value === "Contract")}
                        onCheckedChange={(isChecked) => {
                          field.onChange(isChecked && "Contract");
                        }}
                      />
                      <label
                        htmlFor="employmentTypeContract"
                        className="text-base font-semibold text-[#171717]"
                      >
                        Contract
                      </label>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="employmentDetails.0.jobLocation"
            rules={{
              required: {
                value: true,
                message: "Job location is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s().]*$/,
                message: "Job location is in invalid format",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Job Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`h-10 rounded-[5px] px-2 py-1 ${
                      form?.formState?.errors?.employmentDetails?.[0]
                        ?.jobLocation && "shake"
                    }`}
                    onChange={(e) => {
                      onInputChange(
                        "employmentDetails.0.jobLocation",
                        e.target.value,
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Controller
            name="employmentDetails.0.jobLocation"
            rules={{
              required: {
                value: true,
                message: "Job location is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Location</FormLabel>
                <ReactSelect
                  value={field.value.value}
                  onChange={(newValue: any) => {
                    console.log(newValue);
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
                <FormMessage />
              </FormItem>
            )}
          />
          {/* start date */}
          <FormField
            control={form.control}
            name="employmentDetails.0.startDate"
            rules={{
              required: {
                value: true,
                message: "Start date is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>Start Date</FormLabel>
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
          {/* end date */}
          <FormField
            control={form.control}
            name="employmentDetails.0.endDate"
            disabled={form.watch("employmentDetails.0.currentlyWorkingHere")}
            rules={{
              required: {
                value: !form.watch(`employmentDetails.0.currentlyWorkingHere`),
                message: "End date is required.",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>End Date</FormLabel>
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
                          "bg-white pl-3 text-left font-normal",
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

          <FormField
            control={form.control}
            name="employmentDetails.0.summary"
            rules={{
              required: {
                value: true,
                message: "Please provide a short description",
              },
            }}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className={`resize-none ${
                      form.formState.errors.employmentDetails?.[0]?.summary &&
                      "shake"
                    }`}
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* button */}
        <div className="flex justify-end gap-4">
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
              {isEdit ? "Editing...." : " Adding..."}
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

export default WorkHistoryForm;
