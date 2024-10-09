import LocationFilterInput from "@/components/location-filter-input";
import SideFilterCard from "@/components/side-filter/side-filter-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdminCompanyFilter } from "@/features/admin/recruitment-partner/type/admin-company-filter-recruitment";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const CompanyFilter = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<AdminCompanyFilter, any, AdminCompanyFilter>;
  onSubmit: SubmitHandler<AdminCompanyFilter>;
}) => {
  useFormSubmitionOnFieldChange({ form, onSubmit });

  return (
    <div className="lg:w-[308px]">
      <Form {...form}>
        <SideFilterCard>
          <DynamicHeightContainer>
            <SideFilterCard.FilterItemContainer>
              <SideFilterCard.InputTitle>
                Company Name
              </SideFilterCard.InputTitle>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormControl>
                    <Input className="h-9" {...field} />
                  </FormControl>
                )}
              />
            </SideFilterCard.FilterItemContainer>
            <SideFilterCard.FilterItemContainer>
              <SideFilterCard.InputTitle>Location</SideFilterCard.InputTitle>
              {/* <FormField
                control={form.control}
                name="locations"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      placeholder="eg: Bangalore, Kochi"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          form.setValue("locations", []);
                          return;
                        }
                        form.setValue(
                          "locations",
                          value.split(",").map((location) => location.trim()),
                        );
                      }}
                      value={form.getValues("locations").join(",")}
                      className="h-auto px-4 py-2 text-sm"
                    />
                  </FormControl>
                )}
              />{" "} */}
              <LocationFilterInput name="locations" />
            </SideFilterCard.FilterItemContainer>
            <SideFilterCard.FilterItemContainer>
              <SideFilterCard.InputTitle>Date added</SideFilterCard.InputTitle>

              <FormField
                control={form.control}
                name="dateAdded"
                render={({ field }) => (
                  <FormControl>
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
                              date
                                ? formatISO(date).substring(0, 10)
                                : undefined,
                            );
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                )}
              />
            </SideFilterCard.FilterItemContainer>
            <SideFilterCard.FilterItemContainer>
              <SideFilterCard.InputTitle>
                No. of jobs posted
              </SideFilterCard.InputTitle>
              <FormField
                control={form.control}
                name="jobPosted"
                render={({ field }) => (
                  <FormControl>
                    <Input type="number" className="h-9" {...field} />
                  </FormControl>
                )}
              />{" "}
            </SideFilterCard.FilterItemContainer>
            <SideFilterCard.FilterItemContainer>
              <SideFilterCard.InputTitle>
                No. of recruiters
              </SideFilterCard.InputTitle>
              <FormField
                control={form.control}
                name="recruiters"
                render={({ field }) => (
                  <FormControl>
                    <Input type="number" className="h-9" {...field} />
                  </FormControl>
                )}
              />{" "}
            </SideFilterCard.FilterItemContainer>
          </DynamicHeightContainer>
        </SideFilterCard>
      </Form>
    </div>
  );
};

export default CompanyFilter;
