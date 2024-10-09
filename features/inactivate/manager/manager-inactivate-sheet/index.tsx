import { Sheet, SheetContent } from "@/components/ui/sheet";
import InactivateSheetHeader from "../../common/inactivate-sheet-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InactivateSheetTabHeading from "../../common/inactivate-sheet-tabs-heading";
import { Button } from "@/components/ui/button";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { useBoundStore } from "@/store/useBoundStore";
import CompanyReassignList from "../manager-reassign/company-reassign-list";
import TeamLeadReassignList from "../manager-reassign/team-lead-reassign-list";
import { useInactivateManager } from "../../api/inactivate-manager";
import { Loader2 } from "lucide-react";

const ManagerInactivateSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  companies,
  teamLeads,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
  companies: CompanyDataType[];
  teamLeads: TeamLeadInfo[];
}) => {
  const totalTeamLeads = useBoundStore((state) => state.teamLeadsUnderManager);
  const totalCompanies = useBoundStore((state) => state.companiesUnderManager);

  // const noOfReassignedCompanies = useBoundStore(
  //   (state) => state.companiesReassigned.length,
  // );

  const companiesReassigned = useBoundStore(
    (state) => state.companiesReassigned,
  );

  const teamLeadsReassigned = useBoundStore(
    (state) => state.teamLeadsReassigned,
  );

  const inactivatingManager = useBoundStore(
    (state) => state.inactivatingManager,
  );

  const noOfReassignedCompanies = () => {
    return companiesReassigned?.flatMap((company) => company.assignedCompanies);
  };

  const noOfReassignedTeamLeads = () => {
    return teamLeadsReassigned?.flatMap(
      (teamLead) => teamLead.assignedTeamLeads,
    );
  };

  const handleSuccess = () => {
    setIsSheetOpen(false);
    reset();
  };

  const { mutate: inactivateManager, isLoading: isSubmitting } =
    useInactivateManager(handleSuccess, "admin");

  const isTeamLeadReassignComplete =
    noOfReassignedTeamLeads().length === totalTeamLeads.length;

  const isCompaniesReassignComplete =
    noOfReassignedCompanies().length === totalCompanies.length;

  const isReassignComplete =
    isTeamLeadReassignComplete && isCompaniesReassignComplete;

  const reset = useBoundStore((state) => state.resetManagerReassign);

  const TABS = [
    {
      _id: "1",
      label: (
        <InactivateSheetTabHeading
          count={`${noOfReassignedCompanies().length}/${totalCompanies.length}`}
          label="Companies reassigned"
          isReassignComplete={isCompaniesReassignComplete}
        />
      ),
      content: <CompanyReassignList />,
    },
    {
      _id: "2",
      label: (
        <InactivateSheetTabHeading
          count={`${noOfReassignedTeamLeads().length}/${totalTeamLeads.length}`}
          label="Team Leads reassigned"
          isReassignComplete={isTeamLeadReassignComplete}
        />
      ),
      content: <TeamLeadReassignList />,
    },
  ];

  const submit = () => {
    console.log("hiiiii>>", teamLeadsReassigned, companiesReassigned);
    const data = {
      teamLeads: teamLeadsReassigned.map((teamLead) => ({
        managerId: teamLead.managerId,
        assignedTeamLeads: teamLead.assignedTeamLeads.map(
          (teamLead) => teamLead.teamLeadId,
        ),
      })),
      companies: companiesReassigned.map((company) => ({
        managerId: company.managerId,
        assignedCompanies: company.assignedCompanies.map(
          (company) => company._id,
        ),
      })),
    };
    if (inactivatingManager) {
      inactivateManager({ managerId: inactivatingManager.managerId, data });
    }
    console.log("DATA???", data);
  };
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen(!isSheetOpen);
      }}
    >
      <SheetContent
        isDefaultCloseVisible={false}
        className="flex min-w-[100vw] flex-col gap-0 bg-white p-0 text-brand-black"
        side="right"
      >
        <InactivateSheetHeader>
          <InactivateSheetHeader.Heading>
            Deactivate {inactivateManager.name} Manager account{" "}
          </InactivateSheetHeader.Heading>
          <InactivateSheetHeader.SubHeading>
            Please assign Candidates and Companies under{" "}
            {inactivatingManager?.name} to another Team Lead before deactivating
            his account.{" "}
          </InactivateSheetHeader.SubHeading>
        </InactivateSheetHeader>
        <div className="grow  overflow-auto px-8">
          <Tabs
            defaultValue={TABS[0]._id}
            className="m-0 flex grow flex-col gap-4 p-0"
          >
            <TabsList className=" flex h-auto justify-start gap-3  rounded-none bg-inherit p-0">
              {TABS.map(({ label, _id }) => (
                <TabsTrigger
                  key={_id}
                  value={_id}
                  className="flex-col items-start rounded-none p-0 pb-2 text-base font-medium text-brand-black data-[state=active]:border-b-2 data-[state=active]:border-[#034A9A] "
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {TABS.map(({ content, _id }) => (
              <TabsContent
                key={_id}
                value={_id}
                className="m-0 grow overflow-y-auto"
              >
                {content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div
          style={{ boxShadow: "0px -1px 9.9px 0px rgba(0, 0, 0, 0.12)" }}
          className="flex justify-end gap-[14px] px-[18px] py-5  font-bold"
        >
          <Button
            onClick={() => {
              reset();
              setIsSheetOpen(false);
            }}
            variant={"outline"}
            className="h-[38px] rounded-lg border-0 px-4 py-2 text-brand-black"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              submit();
            }}
            disabled={!isReassignComplete || isSubmitting}
            // style={{ backgroundColor: !isReassignComplete && "#A9A9A9" }}
            className={`h-[38px] px-4 py-2 shadow-submit-btn ${
              !isReassignComplete ? "bg-[#A9A9A9]" : "custom-gradient"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm"
            )}{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ManagerInactivateSheet;
