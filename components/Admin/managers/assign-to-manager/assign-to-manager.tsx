import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReactSelect from "react-select";
import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import useGetManagersForAdmin from "@/features/admin/manager/api/get-managers-for-admin";
import { useRouter } from "next/router";
import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";
import useAssignTeamLeadByAdmin from "@/features/admin/team-lead/api/assign-team-lead-for-admin";
import useAssignCompaniesByAdmin from "@/features/admin/manager/api/assign-companies-by-admin";
import { toast } from "sonner";
import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import { MenuList } from "@/components/menu-list";

export type AssignToManagerProps = {
  assignType: "teamLead" | "recruitmentCompany";
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    height: "auto",
    minHeight: 54,
    border: state.isFocused ? "1px solid #034A9A" : provided.border,
    borderRadius: 5,
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "24px",
    backgroundColor: "#FFF",
    border: "1px solid #D8D8D8",
    text: "#818181",
    textSize: "14px",
    fontWeight: "600",
    padding: "3px 6px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: "50%",
    color: "#656565",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  }),
};

const AssignToManager = () => {
  const router = useRouter();
  const managerId = router.query.managerId as string;
  const searchParams = useSearchParams();
  const assignType =
    searchParams.get("type") ||
    ("team-leads" as "team-leads" | "recruitment-companies");

  const [selectedOption, setSelectedOption] = useState<
    Array<{ value: string; label: string }> | []
  >([]);

  const [dialog, setDialog] = useState({
    isOpen: false,
    type: assignType,
  });

  const { data: teamLeads, isLoading: isTeamLeadsLoading } =
    useGetTeamLeadsForAdmin();

  const {
    data: recruitmentCompanies,
    isLoading: isRecruitmentCompaniesLoading,
    isFetchingNextPage: isFetchingNextRecruitmentCompaniesPage,
    hasNextPage: hasNextRecruitmentCompaniesPage,
    fetchNextPage: fetchNextRecruitmentCompaniesPage,
  } = useGetAllCompanyList();
  console.log(recruitmentCompanies);
  const { data: managers } = useGetManagersForAdmin();
  const manager = managers?.find((manager) => manager.managerId === managerId);
  console.log(manager);
  const options =
    assignType === "team-leads"
      ? teamLeads?.map((teamLead) => ({
          value: teamLead.teamLeadId,
          label: teamLead.name,
        }))
      : recruitmentCompanies?.pages
          .flatMap((pg) => pg.data)
          .map((company) => ({
            value: company._id,
            label: company.companyName,
          }));
  // managers?.map((manager) => ({
  //   value: manager.managerId,
  //   label: manager.name,
  // })) || [];
  const handleError = (err: any) => {
    toast.error(err?.response?.data?.message || "Something went wrong");
  };
  const handleSuccess = () => {
    setDialog({ ...dialog, isOpen: false });
    setSelectedOption([]);
  };
  const { mutate: assignTeamLead, isLoading: isTeamLeadAssigning } =
    useAssignTeamLeadByAdmin(handleSuccess, handleError);
  const { mutate: assignCompanies, isLoading: isManagerAssigning } =
    useAssignCompaniesByAdmin(handleSuccess, handleError);

  const isSubmitting = isTeamLeadAssigning || isManagerAssigning;
  const handleConfirm = () => {
    if (assignType === "team-leads") {
      assignTeamLead({
        managerId,
        teamLeads: selectedOption?.map((option) => option.value) || [],
      });
    }
    if (assignType === "recruitment-companies") {
      assignCompanies({
        managerId,
        companies: selectedOption?.map((option) => option.value) || [],
      });
    }
  };
  console.log(selectedOption);
  return (
    <>
      <Button
        disabled={manager?.docStatus === "inactive"}
        onClick={() => {
          setDialog({ ...dialog, isOpen: true });
        }}
        variant="gradient"
        className={`text-base font-bold ${
          manager?.docStatus === "inactive" ? "bg-[#A9A9A9]" : "custom-gradient"
        }`}
      >
        <>
          {assignType === "recruitment-companies"
            ? "Assign Recruiter"
            : "Assign Team Lead"}
          <Plus color="#fff" size={16} className="ml-0.5" />
        </>
      </Button>
      <Dialog
        open={dialog.isOpen}
        onOpenChange={(value) => {
          setDialog({ ...dialog, isOpen: value });
        }}
      >
        <DialogContent className="p-0  text-brand-black">
          <div className="flex flex-col gap-3 px-6 pb-6 pt-8">
            <div className="space-y-1">
              <h5 className="font-semibold">
                {" "}
                {assignType === "recruitment-companies"
                  ? "Assign Company"
                  : "Assign Team Leads"}{" "}
              </h5>
              <p className="text-sm text-brand-grey ">
                {assignType === "recruitment-companies"
                  ? `Assign Recruitment Companies under ${manager?.name}`
                  : `Assign Team Leads under ${manager?.name}`}{" "}
              </p>
            </div>

            <ReactSelect
              isMulti
              closeMenuOnSelect={false}
              value={selectedOption}
              onChange={(selectedValue) => {
                // console.log(selectedValue);
                setSelectedOption(
                  selectedValue as Array<{ value: string; label: string }>,
                );
              }}
              // @ts-ignore
              hasNextPage={hasNextRecruitmentCompaniesPage}
              isNextPageLoading={isFetchingNextRecruitmentCompaniesPage}
              loadNextPage={fetchNextRecruitmentCompaniesPage}
              itemSize={() => 49}
              components={{ MenuList }}
              options={options}
              styles={{
                ...customStyles,
                control: (provided: any, state: any) => ({
                  ...provided,
                  height: "auto",
                  border: state.isFocused
                    ? "1px solid #007BFF"
                    : provided.border,
                  borderRadius: 8,
                }),
              }}
              isLoading={
                assignType === "recruitment-companies"
                  ? isRecruitmentCompaniesLoading
                  : isTeamLeadsLoading
              }
              placeholder={
                assignType === "recruitment-companies"
                  ? "Select recruiter"
                  : "Select Team lead"
              }
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant={"outline"}
                className="rounded-[5px] border border-[#A9A9A9] bg-[#FFF] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E]"
                onClick={() => {
                  setDialog({ ...dialog, isOpen: false });
                  setSelectedOption([]);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={handleConfirm}
                variant={"gradient"}
                className="rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignToManager;
