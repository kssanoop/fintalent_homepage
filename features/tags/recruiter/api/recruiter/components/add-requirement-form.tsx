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
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddRequirementFormType } from "../type/add-form-type";
import MultiSelectInput from "@/components/layout/multi-select-input";
import useGetSkills from "@/utils/getSkills";
import { Textarea } from "@/components/ui/textarea";
import { useGetNewTags } from "../api/add-new-tags";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { handleKeyDown } from "@/components/recruiter/urgent-requirements/urgent-requirement-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { MenuList } from "@/components/menu-list";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";
import { experienceLevelOptions } from "@/lib/constants/input-options";

interface AddRequirementFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddRequirementForm = ({ setOpen }: AddRequirementFormProps) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );

  const { data: qualifications } = useGetQualifications();
  const transformedQualificationsData = qualifications?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const queryClient = useQueryClient();
  const { data: skillData } = useGetSkills();
  const form = useForm<AddRequirementFormType>({});

  const transformedData = skillData?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["get-tags-by recruiter"] });
    toast.success(data?.message);
  };

  // form error in  submission
  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate: addNewTagMutate,
    isLoading,
    isError,
  } = useGetNewTags(handleSuccess, handleError);

  const onSubmit = (values: AddRequirementFormType) => {
    const updatedSkills = values?.skills?.map((item: any) => item?.value);
    const upatedLocation = values?.location.toString();
    const updatedQualification = values.qualifications?.map(
      (item: any) => item.value,
    );
    addNewTagMutate({
      ...values,
      skills: updatedSkills,
      location: upatedLocation,
      qualifications: updatedQualification,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[13px]">
        <div className="hide-scrollbar flex max-h-[500px] flex-col gap-[13px] overflow-y-auto px-1 pb-1">
          <FormField
            control={form.control}
            name="jobTitle"
            rules={{
              required: {
                value: true,
                message: "Job title is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[54px] text-base font-normal leading-6"
                    placeholder="Finance manager"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="location"
            rules={{
              required: {
                value: true,
                message: "Location is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[54px] text-base font-normal leading-6"
                    placeholder="Kochi, Kerala"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            
          /> */}
          <Controller
            name="location"
            rules={{
              required: {
                value: true,
                message: "Location is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Location
                </FormLabel>{" "}
                <ReactSelect
                  value={
                    field.value
                      ? citiesOptions.filter((city: any) =>
                          Array.isArray(field.value)
                            ? field.value.includes(city.value)
                            : field.value === city.value,
                        )
                      : null
                  }
                  onChange={(selectedOptions) => {
                    const selectedValues = Array.isArray(selectedOptions)
                      ? selectedOptions.map((option) => option.value)
                      : selectedOptions
                        ? [selectedOptions.value]
                        : [];
                    field.onChange(selectedValues);
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

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Experience
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-[54px] w-full">
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevelOptions.map((experienceLevel) => (
                        <SelectItem
                          key={experienceLevel.slug}
                          value={experienceLevel.slug}
                          className="text-base font-normal text-black"
                        >
                          {experienceLevel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Skills required
                </FormLabel>
                <FormControl>
                  <MultiSelectInput
                    height={54}
                    options={transformedData}
                    placeholder="Select skills.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="candidateCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  No. of candidate needed
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[54px] text-base font-normal leading-6"
                    placeholder="20"
                    type="number"
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Qualification{" "}
                </FormLabel>
                <MultiSelectInput
                  options={transformedQualificationsData || []}
                  placeholder="Select qualifications.."
                  height={35}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#171717]">
                  More Details{" "}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[282px] resize-none text-base font-normal leading-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-4 self-end ">
          <Button
            variant={"outline"}
            type="button"
            className="w-[85px] border-[#A9A9A9] px-2.5 py-[5px] text-base font-semibold text-[#5E5E5E]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          {isLoading && !isError ? (
            <Button
              className="rounded-[8px] px-3 py-1.5 text-base font-semibold"
              variant={"gradient"}
              disabled
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Sending..
            </Button>
          ) : (
            <Button
              className="rounded-[8px] px-3 py-1.5 text-base font-semibold"
              variant={"gradient"}
            >
              Send to Consultant
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddRequirementForm;
