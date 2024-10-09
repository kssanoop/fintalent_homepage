// import LocationFilterInput from "@/components/location-filter-input";
import LocationFilterInput from "@/components/location-filter-input";
import SideFilterCard from "@/components/side-filter/side-filter-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
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
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { TagsFilterDataType } from "@/features/tags/recruiter/api/get-tags-recruiter";
import { experienceLevelOptions } from "@/lib/constants/input-options";
import { ExperianceLevel } from "@/types/filter";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const ACTIVE_OPTIONS = ["active", "inactive", "all"];

const TagsFilter = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<TagsFilterDataType, any, TagsFilterDataType>;
  onSubmit: SubmitHandler<TagsFilterDataType>;
}) => {
  useFormSubmitionOnFieldChange({ form, onSubmit });

  return (
    <Form {...form}>
      <SideFilterCard>
        <SideFilterCard.Header>
          <h3 className="text-[#171717]">Filters</h3>
        </SideFilterCard.Header>
        <DynamicHeightContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Code</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="tagCode"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Company</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Location</SideFilterCard.InputTitle>
            {/* <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "} */}
            <LocationFilterInput name="location" />
            {/* <LocationFilterInputString name="location" /> */}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Posted by</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="recruiterName"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Date posted</SideFilterCard.InputTitle>
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
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>
              Experience Level
            </SideFilterCard.InputTitle>
            <div className="flex flex-wrap gap-y-4">
              <FormField
                control={form.control}
                name={"experienceLevel"}
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
          </SideFilterCard.FilterItemContainer>

          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Status</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <Select
                  value={form.getValues("status")}
                  onValueChange={(value: "active" | "inactive") => {
                    form.setValue("status", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="h-auto px-4 py-2 capitalize">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ACTIVE_OPTIONS.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="capitalize"
                      >
                        {option === "" ? "all" : option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </SideFilterCard.FilterItemContainer>
        </DynamicHeightContainer>
      </SideFilterCard>
    </Form>
  );
};

export default TagsFilter;
