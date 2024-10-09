import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cnHelper";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { FilterDateSchema } from "./Schema/filter-date-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatDate } from "@/utils/format-date";

interface CalendarPickerDialogprops {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setToDate: Dispatch<SetStateAction<Date>>;
  setFromDate: Dispatch<SetStateAction<Date>>;
}

const CalendarPickerDialog = ({
  open,
  setOpen,
  setFromDate,
  setToDate,
}: CalendarPickerDialogprops) => {
  const form = useForm<FilterDateSchema>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FilterDateSchema> = (values) => {
    console.log("form values:", values);
    setFromDate(new Date(values?.startDate));
    setToDate(new Date(values?.endDate));
    form.setValue("startDate", "");
    form.setValue("endDate", "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-grow flex-col">
                        <FormLabel className="text-base font-semibold text-[#171717]">
                          From
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
                                  <span className="text-base font-normal text-[#A9A9A9]">
                                    Choose date
                                  </span>
                                )}
                                <CalendarIcon
                                  className="ml-auto h-5 w-5"
                                  color="#171717"
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(value) => {
                                form.setValue("startDate", formatDate(value));
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-grow flex-col">
                        <FormLabel className="text-base font-semibold text-[#171717]">
                          To
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
                                  <span className="text-base font-normal text-[#A9A9A9]">
                                    {" "}
                                    Choose date
                                  </span>
                                )}
                                <CalendarIcon
                                  className="ml-auto h-5 w-5"
                                  color="#171717"
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(value) => {
                                if (value) {
                                  const formattedDate = format(
                                    value,
                                    "yyyy-MM-dd",
                                  );
                                  form.setValue("endDate", formattedDate);
                                }
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant={"outline"}
                    className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
                  >
                    Cancel
                  </Button>
                  <Button variant={"gradient"}>Submit</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};

export default CalendarPickerDialog;
