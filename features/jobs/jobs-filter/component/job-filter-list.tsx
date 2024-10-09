import { UseFormReturn } from "react-hook-form";
import { JobsFilter } from "../type/jobs-filter";
import FilterCard from "@/components/side-filter/side-filter-card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  employmentModeOptions,
  employmentTypeOptions,
  experienceLevelOptions,
  jobScheduleOptions,
  jobStatusOptions,
} from "@/lib/constants/input-options";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EmploymentMode,
  EmploymentType,
  ExperianceLevel,
  JobSchedule,
} from "@/types/filter";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, formatISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "../../type/job-status";
import LocationFilterInput from "@/components/location-filter-input";
import MultiSelectInput from "@/components/layout/multi-select-input";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";
import useGetSkills from "@/utils/getSkills";

const JobFilterList = ({
  form,
  filterType,
}: {
  form: UseFormReturn<JobsFilter, any, JobsFilter>;
  filterType: "viewAll" | "viewLess";
}) => {
  const { data: qualifications } = useGetQualifications();
  const transformedQualificationsData = qualifications?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const { data: skillData } = useGetSkills();
  const transformedData = skillData?.map((item: any) => ({
    value: item,
    label: item,
  }));

  return (
    <>
      <FilterCard.FilterItemContainer>
        <FilterCard.InputTitle>Job Type</FilterCard.InputTitle>
        <div className="flex flex-wrap gap-y-4">
          <FormField
            control={form.control}
            name={"jobType"}
            render={({ field }) => {
              console.log(field.value);
              return (
                <>
                  {employmentTypeOptions.map((option) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex w-1/2 items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(
                            option.slug as EmploymentType,
                          )}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field?.value, option.slug])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== option.slug,
                                  ),
                                );
                          }}
                          id={option.name}
                          className="h-4 w-4  "
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={option.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </FormLabel>
                    </div>
                  ))}
                </>
              );
            }}
          />
        </div>
      </FilterCard.FilterItemContainer>

      <FilterCard.FilterItemContainer>
        <FilterCard.InputTitle>Location</FilterCard.InputTitle>
        <LocationFilterInput name="location" />
      </FilterCard.FilterItemContainer>

      <FilterCard.FilterItemContainer>
        <FilterCard.InputTitle>Experience Level</FilterCard.InputTitle>
        <div className="flex flex-wrap gap-y-4">
          <FormField
            control={form.control}
            name={"experianceLevel"}
            render={({ field }) => (
              <>
                {experienceLevelOptions.map((option) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex w-1/2 items-center space-x-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(
                          option.slug as ExperianceLevel,
                        )}
                        onCheckedChange={(checked) => {
                          checked
                            ? field.onChange([...field.value, option.slug])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== option.slug,
                                ),
                              );
                        }}
                        id={option.name}
                        className="h-4 w-4 data-[state=checked]:border-0 data-[state=unchecked]:border-border "
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={option.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.name}
                    </FormLabel>
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </FilterCard.FilterItemContainer>

      <FilterCard.FilterItemContainer>
        <FilterCard.InputTitle> On site/Remote/WFA</FilterCard.InputTitle>
        <div className="flex flex-wrap gap-y-4">
          <FormField
            control={form.control}
            name="employmentMode"
            render={({ field }) => (
              <>
                {employmentModeOptions.map((option) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex w-1/2 items-center space-x-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(
                          option.slug as EmploymentMode,
                        )}
                        onCheckedChange={(checked) => {
                          checked
                            ? field.onChange([...field.value, option.slug])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== option.slug,
                                ),
                              );
                        }}
                        id={option.name}
                        className="h-4 w-4 data-[state=checked]:border-0 data-[state=unchecked]:border-border "
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={option.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.name}
                    </FormLabel>
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </FilterCard.FilterItemContainer>

      {
        <FilterCard.FilterItemContainer>
          <FilterCard.InputTitle>Shift</FilterCard.InputTitle>
          <div className="flex flex-wrap gap-y-4">
            <FormField
              control={form.control}
              name="jobSchedule"
              render={({ field }) => (
                <>
                  {jobScheduleOptions.map((option) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex w-1/2 items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(
                            option.slug as JobSchedule,
                          )}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, option.slug])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== option.slug,
                                  ),
                                );
                          }}
                          id={option.name}
                          className="h-4 w-4 data-[state=checked]:border-0 data-[state=unchecked]:border-border "
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={option.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </FormLabel>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
        </FilterCard.FilterItemContainer>
      }

      {filterType === "viewAll" && (
        <>
          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>Qualification </FilterCard.InputTitle>
            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormControl>
                  <MultiSelectInput
                    options={transformedQualificationsData || []}
                    placeholder="Select qualifications.."
                    height={35}
                    {...field}
                  />
                </FormControl>
              )}
            />
          </FilterCard.FilterItemContainer>

          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>Skills required</FilterCard.InputTitle>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormControl>
                  <MultiSelectInput
                    options={transformedData}
                    placeholder="Select skills.."
                    height={35}
                    {...field}
                  />
                </FormControl>
              )}
            />{" "}
          </FilterCard.FilterItemContainer>

          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>Date posted</FilterCard.InputTitle>
            <FormField
              control={form.control}
              name="datePosted"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="h-[37.78px] w-full rounded-md border border-input bg-inherit font-medium text-[#A9A9A9] "
                    >
                      {field.value ? (
                        // @ts-ignore
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      // @ts-ignore
                      selected={new Date(field.value)}
                      onSelect={(date) => {
                        field.onChange(
                          date ? formatISO(date).substring(0, 10) : undefined,
                        );
                      }}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </FilterCard.FilterItemContainer>

          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>Job status</FilterCard.InputTitle>
            <FormField
              control={form.control}
              name="jobStatus"
              render={({ field }) => (
                <Select
                  defaultValue={form.getValues("jobStatus")}
                  value={form.getValues("jobStatus")}
                  onValueChange={(value: JobStatus) => {
                    form.setValue("jobStatus", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="h-auto px-4 py-2">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobStatusOptions.map((option) => (
                      <SelectItem key={option.slug} value={option.slug}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FilterCard.FilterItemContainer>

          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>Salary Range</FilterCard.InputTitle>
            <div className=" flex items-center justify-between gap-2.5">
              <FormField
                control={form.control}
                rules={{
                  validate: (value) => {
                    console.log(form.watch("salaryEnd"));
                    if (
                      Number(value) > Number(form.watch("salaryEnd")) &&
                      form.watch("salaryEnd") !== "0"
                    ) {
                      return "Provide a valid range.";
                    } else {
                      return true;
                    }
                  },
                }}
                name="salaryBegin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          {...field}
                          className=" h-auto w-full bg-inherit py-2 pr-10 placeholder:text-[#A9A9A9]"
                        />
                        <span className="absolute right-2 top-1/2  -translate-y-1/2 text-sm font-medium text-brand-grey">
                          lpa
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-6 text-center">-</div>
              <FormField
                control={form.control}
                name="salaryEnd"
                rules={{
                  validate: (value) => {
                    if (
                      Number(value) < Number(form.watch("salaryBegin")) &&
                      form.watch("salaryBegin") !== "0"
                    ) {
                      return "Provide a valid range.";
                    } else {
                      return true;
                    }
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="h-auto w-full bg-inherit py-2 pr-10 placeholder:text-[#A9A9A9]"
                        />
                        <span className="absolute right-2 top-1/2  -translate-y-1/2 text-sm font-medium text-brand-grey">
                          lpa
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FilterCard.FilterItemContainer>
        </>
      )}
    </>
  );
};

export default JobFilterList;
