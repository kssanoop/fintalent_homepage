import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ManagerInfo,
  ManagerInfoWithRole,
} from "@/features/admin/manager/type/manager-info";
import AddEditManagerDialog from "../../add-edit-manager/add-edit-manager-dialog";
import EditManagerForm from "../../add-edit-manager/edit-manager-form";
import { useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import ManagerInactivateSheet from "@/features/inactivate/manager/manager-inactivate-sheet";
import useGetTeamLeadsForAdminUnderManager from "@/features/admin/manager/api/get-team-leads-for-admin-under-manager";
import useGetCompaniesForAdminUnderManager from "@/features/admin/manager/api/get-companies-for-admin-under-manager";
import { useBoundStore } from "@/store/useBoundStore";
import { useActivateManager } from "@/features/inactivate/api/activate-manager";
import { useInactivateManager } from "@/features/inactivate/api/inactivate-manager";

const ManagerInfoCard = ({ manager }: { manager: ManagerInfoWithRole }) => {
  const [isInactivateSheetOpen, setIsInactivateSheetOpen] = useState(false);
  const [isEditManager, setIsEditManager] = useState<{
    isDialogOpen: boolean;
    manager: ManagerInfo;
  }>({
    isDialogOpen: false,
    manager: {
      managerId: "",
      name: "",
      email: "",
      phoneNo: "",
      designation: "",
      employeeId: "",
      companies: [],
      teamLeads: [],
      profilePhoto: {
        storageName: "",
        originalName: "",
      },
    },
  });

  const { mutate: activateManager, isLoading: isSubmitting } =
    useActivateManager(() => {}, "admin");

  const { data: teamLeads, isLoading: isTeamLeadsLoading } =
    useGetTeamLeadsForAdminUnderManager(manager.managerId);

  const { data: companies, isLoading: isCompaniesLoading } =
    useGetCompaniesForAdminUnderManager(manager.managerId);

  const setInactivatingManager = useBoundStore(
    (state) => state.setInactivatingManager,
  );

  const updateTeamLeads = useBoundStore((state) => state.updateTeamLeads);

  const updateCompanies = useBoundStore((state) => state.updateCompanies);

  const { mutate: inactivateManager, isLoading: isInactivating } =
    useInactivateManager(() => {}, "admin");

  const handleEditDialogOpen = (arg: boolean) => {
    setIsEditManager((prev) => ({ ...prev, isDialogOpen: arg }));
  };

  const handleEditClick = () => {
    setIsEditManager({ isDialogOpen: true, manager });
  };

  if (teamLeads) {
    updateTeamLeads(teamLeads);
  }

  if (companies) {
    updateCompanies(companies);
  }

  return (
    <>
      <Card className="flex min-h-[133px] items-center justify-between">
        <div className="flex gap-3 pl-[26px]">
          <Avatar className="h-[90px] w-[90px] border-2 shadow">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${manager.profilePhoto.storageName}`}
            />
            <AvatarProfileFallback />
          </Avatar>

          <div className="space-y-1 text-brand-black">
            <h3 className="text-xl font-bold">{manager.name}</h3>
            <div className="flex items-center gap-1 text-sm font-medium">
              {/* NOTE: conditional rendering used since this field are optional on manager creation */}
              {manager.role && (
                <>
                  <p>{manager.role}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      transform="rotate(180 2 2.5)"
                      fill="#5E5E5E"
                    />
                  </svg>{" "}
                </>
              )}

              {manager.designation && (
                <>
                  <p>{manager.designation}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                  >
                    <circle
                      cx="2"
                      cy="2.5"
                      r="2"
                      transform="rotate(180 2 2.5)"
                      fill="#5E5E5E"
                    />
                  </svg>{" "}
                </>
              )}

              <p>Manager ID {manager.employeeId}</p>
            </div>
            <div className="flex gap-2 text-sm">
              {manager.email && (
                <Link
                  href={`mailto:${manager.email}`}
                  target="_blank"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Mail size={15} color="#171717" strokeWidth={2} />
                  <p>{manager.email}</p>
                </Link>
              )}
              <Link
                href={`tel:${manager.phoneNo}`}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone size={15} color="#171717" strokeWidth={2} />
                <p>{manager.phoneNo}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-3 self-start p-4 ">
          <Button
            onClick={() => {
              handleEditClick();
            }}
            variant="outline"
            className="border-background-color bg-[#F9FDFF] font-bold text-brand-grey"
          >
            Edit
          </Button>
          {manager.docStatus === "active" ? (
            <Button
              onClick={() => {
                if (teamLeads?.length === 0 && companies?.length === 0) {
                  inactivateManager({
                    managerId: manager.managerId,
                    data: {
                      companies: [],
                      teamLeads: [],
                    },
                  });
                } else {
                  setIsInactivateSheetOpen(true);
                  setInactivatingManager(manager);
                }
              }}
              disabled={
                isTeamLeadsLoading || isCompaniesLoading || isInactivating
              }
              variant="outline"
              className="border-background-color bg-[#F9FDFF] font-bold text-[#FF5555]"
            >
              {isInactivating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inactivating...
                </>
              ) : (
                "Inactivate"
              )}
            </Button>
          ) : (
            <Button
              onClick={() => {
                activateManager({ managerId: manager.managerId });
              }}
              disabled={isSubmitting}
              variant="outline"
              className="border-background-color bg-[#F9FDFF] font-bold text-brand-blue"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Activating...
                </>
              ) : (
                "Activate"
              )}
            </Button>
          )}
        </div>
        <AddEditManagerDialog
          title="Edit Manager"
          formComponent={
            <EditManagerForm
              manager={isEditManager.manager}
              handleOpen={handleEditDialogOpen}
            />
          }
          open={isEditManager.isDialogOpen}
          handleOpen={handleEditDialogOpen}
        />
      </Card>
      {companies && teamLeads && (
        <ManagerInactivateSheet
          companies={companies}
          teamLeads={teamLeads}
          isSheetOpen={isInactivateSheetOpen}
          setIsSheetOpen={(value: boolean) => {
            setIsInactivateSheetOpen(value);
            !value && setInactivatingManager(null);
          }}
        />
      )}
    </>
  );
};

export default ManagerInfoCard;
