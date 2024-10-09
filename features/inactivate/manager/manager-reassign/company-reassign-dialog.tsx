import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ManagerInfoWithRole } from "@/features/admin/manager/type/manager-info";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";

const CompanyReassignDialog = ({
  open,
  handleOpen,
  reassigningManager,
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  reassigningManager: ManagerInfoWithRole | undefined;
}) => {
  const [selectedCompanies, setSelectedCompanies] = useState<CompanyDataType[]>(
    [],
  );
  console.log(selectedCompanies);
  const allCompanies = useBoundStore((state) => state.companiesUnderManager);

  const companiesReassigned = useBoundStore(
    (state) => state.companiesReassigned,
  );

  const getUnassignedCompanies = () => {
    if (companiesReassigned.length === 0) return allCompanies;
    const assignedCompanies = companiesReassigned?.flatMap(
      (company) => company.assignedCompanies,
    );
    return allCompanies.filter((company) => {
      return !assignedCompanies.some((assignedCompany) => {
        return assignedCompany._id === company._id;
      });
    });
  };

  // const inactivatingManager = useBoundStore(
  //   (state) => state.inactivatingManager,
  // );

  const reassignCompanies = useBoundStore((state) => state.reAssignCompany);

  const [searchQuery, setSearchQuery] = useState("");

  //   filtered companies after search
  const filteredremainigCompanies = getUnassignedCompanies().filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const saveSelectedCompanies = () => {
    console.log(selectedCompanies.length);
    if (reassigningManager) {
      reassignCompanies({
        managerId: reassigningManager.managerId,
        assignedCompanies: selectedCompanies,
      });
    }
    setSelectedCompanies([]);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpen(false);
        // setSelectedCompanies([]);
      }}
    >
      <DialogContent className="max-w-2xl p-0 text-brand-black">
        <div className="flex flex-col gap-6 px-7 py-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold leading-normal">
              Assign Company
            </DialogTitle>
            <p className="text-brand-grey">
              Assign Companies under {reassigningManager?.name}
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Search Company"
              className="h-10 px-2 placeholder:font-normal placeholder:text-[#A9A9A9]"
            />

            <div>
              <div className="mb-1 flex items-center gap-1">
                <Checkbox
                  checked={filteredremainigCompanies.every((company) =>
                    selectedCompanies.some(
                      (selectedCompany) => selectedCompany._id === company._id,
                    ),
                  )}
                  onCheckedChange={(checked) => {
                    checked
                      ? setSelectedCompanies(
                          filteredremainigCompanies.map((company) => company),
                        )
                      : setSelectedCompanies([]);
                  }}
                  className="h-4 w-4"
                />
                <p className="font-medium">
                  {filteredremainigCompanies.length} results
                </p>
              </div>
              <ScrollArea className="h-[30vh]">
                {filteredremainigCompanies.map((company) => (
                  <div
                    key={company._id}
                    className="flex items-center gap-2 border-b border-border py-4"
                  >
                    <Checkbox
                      checked={selectedCompanies
                        .map((company) => company._id)
                        ?.includes(company._id)}
                      onCheckedChange={(checked) => {
                        checked
                          ? setSelectedCompanies((prev) => [...prev, company])
                          : setSelectedCompanies(
                              selectedCompanies?.filter(
                                (value) => value._id !== company._id,
                              ),
                            );
                      }}
                      className="h-4 w-4"
                    />
                    <Avatar className="h-9 w-9 shadow">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${company.companyLogo.storageName}`}
                        className=""
                      />
                      <AvatarProfileFallback />
                    </Avatar>
                    <p className="text-sm font-bold">{company.companyName}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <div className="flex justify-end gap-3.5">
              <Button
                onClick={() => {
                  handleOpen(false);
                  setSelectedCompanies([]);
                }}
                variant={"outline"}
                className=" rounded-lg border-0 px-4 py-2 text-xl font-bold text-brand-black"
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  saveSelectedCompanies();
                  handleOpen(false);
                }}
                variant="gradient"
                className="  px-[18px] py-2 text-xl font-bold shadow-submit-btn"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyReassignDialog;
