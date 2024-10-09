import SideFilterCard from "@/components/side-filter/side-filter-card";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManagerFilterForAdmin } from "@/features/admin/manager/type/manager-filter-for admin";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const ManagerFilter = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<ManagerFilterForAdmin, any, ManagerFilterForAdmin>;
  onSubmit: SubmitHandler<ManagerFilterForAdmin>;
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
            <SideFilterCard.InputTitle>Company Name</SideFilterCard.InputTitle>
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
            <SideFilterCard.InputTitle>Manager Name</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Manager ID</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Department</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Phone</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormControl>
                  <Input type="number" className="h-9" {...field} />
                </FormControl>
              )}
            />{" "}
          </SideFilterCard.FilterItemContainer>
          <SideFilterCard.FilterItemContainer>
            <SideFilterCard.InputTitle>Email</SideFilterCard.InputTitle>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input type="email" className="h-9" {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </SideFilterCard.FilterItemContainer>
        </DynamicHeightContainer>
      </SideFilterCard>
    </Form>
  );
};

export default ManagerFilter;
