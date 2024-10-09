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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction } from "react";

import { cn } from "@/utils/cnHelper";

import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { EducationDetails, EducationHistory } from "../Schema/EducationSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/utils/format-date";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddData } from "../../WorkHistory/api/updateWorkHistory";
import { toast } from "sonner";
import { educationLevelOptions } from "@/lib/constants/input-options";
interface EducationFormProps {
  educationDetails: EducationDetails;
  isEdit: boolean;
  clickedIndex: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EducationForm = ({
  educationDetails,
  isEdit,
  clickedIndex,
  setOpen,
}: EducationFormProps) => {
  type FormFieldName =
    | "educationDetails.0.instituteName"
    | "educationDetails.0.courseName";
  const defaultValuesForms = isEdit
    ? {
        educationDetails: [
          {
            educationLevel: educationDetails[clickedIndex].educationLevel,
            instituteName: educationDetails[clickedIndex].instituteName,
            courseName: educationDetails[clickedIndex].courseName,
            startDate: educationDetails[clickedIndex].startDate,
            endDate: educationDetails[clickedIndex].endDate,
            currentlyStudyingHere:
              educationDetails[clickedIndex].currentlyStudyingHere,
          },
        ],
      }
    : {
        educationDetails: [
          {
            educationLevel: "",
            instituteName: "",
            courseName: "",
            startDate: "",
            endDate: "",
            currentlyStudyingHere: false,
          },
        ],
      };
  const form = useForm<EducationHistory>({
    defaultValues: defaultValuesForms,
  });

  const queryClient = useQueryClient();

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data?.message);
  };

  const handleError = (error: any) => {
    // console.log("Error:", error);
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddData(handleSuccess, handleError);

  const oldEducationDetails = {
    educationDetails: educationDetails.map((education: any) => ({
      educationLevel: education.educationLevel,
      instituteName: education.instituteName,
      courseName: education.courseName,
      startDate: formatDate(new Date(education.startDate)),
      ...(!education.currentlyStudyingHere && {
        endDate: formatDate(new Date(education.endDate)),
      }),
      currentlyStudyingHere: education.currentlyStudyingHere,
    })),
  };

  const onSubmit: SubmitHandler<EducationHistory> = (values) => {
    // console.log("form values:", values)
    const payload = {
      educationDetails: [
        {
          educationLevel: values.educationDetails[0].educationLevel,
          instituteName: values.educationDetails[0].instituteName,
          courseName: values.educationDetails[0].courseName,
          currentlyStudyingHere:
            values.educationDetails[0].currentlyStudyingHere,
          startDate: formatDate(new Date(values.educationDetails[0].startDate)),
          ...(!values.educationDetails[0].currentlyStudyingHere && {
            endDate: formatDate(new Date(values.educationDetails[0].endDate)),
          }),
        },
      ],
    };

    if (isEdit) {
      // Handle edit mode
      const updatedDetails = [...oldEducationDetails.educationDetails];
      updatedDetails[clickedIndex] = payload.educationDetails[0];

      mutate({
        educationDetails: updatedDetails,
      });
    } else {
      // Handle add mode
      const updatedDetails = [...oldEducationDetails.educationDetails];
      updatedDetails.push(values.educationDetails[0]);

      // Update the form data
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      form.setValue("educationDetails", updatedDetails);

      const educationDetailsData = {
        educationDetails: updatedDetails,
      };

      mutate(educationDetailsData);
    }
  };

  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="hide-scrollbar scroll-container flex max-h-[500px] w-full flex-col gap-6 overflow-auto px-1">
          <FormField
            control={form.control}
            name={`educationDetails.0.educationLevel`}
            rules={{
              required: {
                value: true,
                message: "Education level is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`h-10 ${
                        form.formState.errors.educationDetails?.[0]
                          ?.educationLevel && "shake"
                      }`}
                    >
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
                message: "Institute name is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s().]*$/,
                message: "Invalid Institute Name",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/ Univeristy</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`h-10 rounded-[5px] px-2 py-1 ${
                      form.formState.errors.educationDetails?.[0]
                        ?.instituteName && "shake"
                    }`}
                    onChange={(e) => {
                      onInputChange(
                        "educationDetails.0.instituteName",
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
            name="educationDetails.0.courseName"
            rules={{
              required: {
                value: true,
                message: "Course name is required",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s().]*$/,
                message: "Invalid Institute Name",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="B.Tech Computer Science"
                    {...field}
                    className={`h-10 ${
                      form.formState.errors.educationDetails?.[0]?.courseName &&
                      "shake"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationDetails.0.startDate"
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

          <FormField
            control={form.control}
            name="educationDetails.0.endDate"
            disabled={form.watch("educationDetails.0.currentlyStudyingHere")}
            rules={{
              required: {
                value: !form.watch("educationDetails.0.currentlyStudyingHere"),
                message: "End date is required",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>End Date</FormLabel>
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
                          "bg-white pl-3 text-left font-normal",
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
            name="educationDetails.0.currentlyStudyingHere"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    className="h-[18px] w-[18px]"
                    checked={field.value}
                    defaultChecked={false}
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

export default EducationForm;
