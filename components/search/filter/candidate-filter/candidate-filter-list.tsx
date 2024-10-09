import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import {
  ageOptions,
  employmentModeOptions,
  employmentTypeOptions,
  experienceLevelOptions,
  genderOptions,
  // jobScheduleOptions,
  noticePeriodOptions,
} from "@/lib/constants/input-options";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import MultiSelectInput from "@/components/layout/multi-select-input";
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
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  AgeRange,
  EmploymentMode,
  EmploymentType,
  ExperianceLevel,
  // JobSchedule,
} from "@/types/filter";
import FilterCard from "@/components/side-filter/side-filter-card";
import LocationFilterInput from "@/components/location-filter-input";
import useGetSkills from "@/utils/getSkills";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";

const CandidateFilterList = ({
  form,
  filterType,
}: {
  form: UseFormReturn<CandidateFilters, any, CandidateFilters>;
  filterType: "viewAll" | "viewLess";
}) => {
  const { data: skillData } = useGetSkills();
  const transformedSkillsData = skillData?.map((item: any) => ({
    value: item,
    label: item,
  }));
  const { data: qualifications } = useGetQualifications();
  const transformedQualificationsData = qualifications?.map((item: any) => ({
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
            name={"employmentType"}
            render={({ field }) => {
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
              );
            }}
          />
        </div>
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
        <FilterCard.InputTitle>Location</FilterCard.InputTitle>
        {/* <div className="flex flex-wrap gap-y-4"> */}
        {/* <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <Input
                placeholder="eg: Bangalore, Kochi"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    form.setValue("location", []);
                    return;
                  }
                  form.setValue(
                    "location",
                    value.split(",").map((skill) => skill.trim()),
                  );
                }}
                value={form.getValues("location").join(",")}
                className="h-auto px-4 py-2 text-sm"
              />
            )}
          /> */}
        <LocationFilterInput name="location" />
        {/* </div> */}
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

      {/* {filterType === "viewAll" && (
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
      )} */}

      {filterType === "viewAll" && (
        <FilterCard.FilterItemContainer>
          <FilterCard.InputTitle>Skills</FilterCard.InputTitle>
          {/* <div className="flex flex-wrap gap-y-4"> */}
          {/* <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <Input
                  placeholder="eg: Management, Communication"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      form.setValue("skills", []);
                      return;
                    }
                    form.setValue(
                      "skills",
                      value.split(",").map((skill) => skill.trim()),
                    );
                  }}
                  value={form.getValues("skills").join(",")}
                  className="h-auto px-4 py-2 text-sm"
                />
              )}
            /> */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormControl>
                <MultiSelectInput
                  options={transformedSkillsData}
                  placeholder="Select skills.."
                  height={35}
                  {...field}
                />
              </FormControl>
            )}
          />{" "}
          {/* </div> */}
        </FilterCard.FilterItemContainer>
      )}

      {/* qualifications */}
      {filterType === "viewAll" && (
        <FilterCard.FilterItemContainer>
          <FilterCard.InputTitle>Qualifications</FilterCard.InputTitle>
          {/* <div className="flex flex-wrap gap-y-4"> */}
          {/* <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <Input
                  placeholder="eg: B.Com, ACCA"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      form.setValue("qualification", []);
                      return;
                    }
                    form.setValue(
                      "qualification",
                      value.split(",").map((skill) => skill.trim()),
                    );
                  }}
                  value={form.getValues("qualification").join(",")}
                  className="h-auto px-4 py-2 text-sm"
                />
              )}
            /> */}

          <FormField
            control={form.control}
            name="qualification"
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
          {/* </div> */}
        </FilterCard.FilterItemContainer>
      )}

      <FilterCard.FilterItemContainer>
        <FilterCard.InputTitle>Salary Range</FilterCard.InputTitle>
        <div className=" flex items-center justify-between gap-2.5">
          <FormField
            control={form.control}
            rules={{
              required: {
                message: "required field.",
                value: true,
              },
              validate: (value) => {
                console.log(form.watch("salaryEnd"));
                if (
                  Number(value) > Number(form.watch("salaryEnd")) &&
                  form.watch("salaryEnd") !== "0"
                ) {
                  return "Provide a valid range.";
                }
                return true;
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
              required: {
                message: "required field.",
                value: true,
              },
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
      {filterType === "viewAll" && (
        <>
          <div className="flex gap-3 border-t border-border-secondary p-4 text-sm font-medium text-brand-black">
            <div className="w-1/2">
              <FilterCard.InputTitle>Gender</FilterCard.InputTitle>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <Select
                    value={form.getValues("gender")[0]}
                    onValueChange={(value) => {
                      form.setValue("gender", [value]);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="h-auto px-4 py-2">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.slug} value={option.slug}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="w-1/2">
              <div>
                <FilterCard.InputTitle>Age</FilterCard.InputTitle>
                <FormField
                  control={form.control}
                  name="ageRange"
                  render={({ field }) => (
                    <Select
                      value={form.getValues("ageRange")[0]}
                      onValueChange={(value) => {
                        form.setValue("ageRange", [value as AgeRange]);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="h-[37.78px] px-4 py-2">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ageOptions.map((option) => (
                          <SelectItem key={option.slug} value={option.slug}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t border-border-secondary p-4 text-sm font-medium text-brand-black">
            <div className="w-1/2">
              <FilterCard.InputTitle>Available from</FilterCard.InputTitle>
              <FormField
                control={form.control}
                name="availableFrom"
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
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(
                            date ? formatISO(date).substring(0, 10) : undefined,
                          );
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div className="w-1/2">
              <div>
                <FilterCard.InputTitle>Notice Period</FilterCard.InputTitle>
                <FormField
                  control={form.control}
                  name="noticePeriod"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-[37.78px]  py-2">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {noticePeriodOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <FilterCard.FilterItemContainer>
            <FilterCard.InputTitle>
              Date of profile verification
            </FilterCard.InputTitle>
            <FormField
              control={form.control}
              name="dateOfVerification"
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
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </FilterCard.FilterItemContainer>
        </>
      )}
    </>
  );
};

export default CandidateFilterList;
