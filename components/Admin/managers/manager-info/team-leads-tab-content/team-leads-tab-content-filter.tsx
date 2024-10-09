import SideFilterCard from "@/components/side-filter/side-filter-card";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamLeadFilter } from "@/features/admin/team-lead/type/team-lead-filter";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const TeamLeadsTabContentFilter = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<TeamLeadFilter, any, TeamLeadFilter>;
  onSubmit?: SubmitHandler<TeamLeadFilter>;
}) => {
  useFormSubmitionOnFieldChange({ form, onSubmit });
  return (
    // temp logic for fixing build error , needs to change form from optional
    <>
      {form && (
        <Form {...form}>
          <SideFilterCard>
            <SideFilterCard.Header>
              <h3 className="text-[#171717]">Filters</h3>
            </SideFilterCard.Header>
            <DynamicHeightContainer>
              <SideFilterCard.FilterItemContainer>
                <SideFilterCard.InputTitle>TL Name</SideFilterCard.InputTitle>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormControl>
                      <Input className="h-9" {...field} />
                    </FormControl>
                  )}
                />
              </SideFilterCard.FilterItemContainer>
              <SideFilterCard.FilterItemContainer>
                <SideFilterCard.InputTitle>TL ID</SideFilterCard.InputTitle>
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
                <SideFilterCard.InputTitle>
                  Designation
                </SideFilterCard.InputTitle>
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormControl>
                      <Input className="h-9" {...field} />
                    </FormControl>
                  )}
                />{" "}
              </SideFilterCard.FilterItemContainer>
              <SideFilterCard.FilterItemContainer>
                <SideFilterCard.InputTitle>Role</SideFilterCard.InputTitle>
                <FormField
                  control={form.control}
                  name="role"
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
                      <Input className="h-9" {...field} />
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
                    <FormControl>
                      <Input className="h-9" {...field} />
                    </FormControl>
                  )}
                />{" "}
              </SideFilterCard.FilterItemContainer>
            </DynamicHeightContainer>
          </SideFilterCard>
        </Form>
      )}
    </>
  );
};

export default TeamLeadsTabContentFilter;
