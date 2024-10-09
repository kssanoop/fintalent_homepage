import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetCompaniesForAdminUnderManager from "@/features/admin/manager/api/get-companies-for-admin-under-manager";
import useGetTeamLeadsForAdminUnderManager from "@/features/admin/manager/api/get-team-leads-for-admin-under-manager";
import {
  ManagerInfo,
  ManagerInfoWithRole,
} from "@/features/admin/manager/type/manager-info";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { useActivateManager } from "@/features/inactivate/api/activate-manager";
import { useInactivateManager } from "@/features/inactivate/api/inactivate-manager";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { useBoundStore } from "@/store/useBoundStore";
import { Loader2, MoreVertical } from "lucide-react";
import React, { useState } from "react";

export interface ManagerMenuProps {
  // isOpen: boolean;
  manager: ManagerInfoWithRole;
  setIsEditManager: React.Dispatch<
    React.SetStateAction<{
      isDialogOpen: boolean;
      manager: ManagerInfo;
    }>
  >;
  setInactivateSheet: React.Dispatch<
    React.SetStateAction<{
      isSheetOpen: boolean;
      teamLeads: TeamLeadInfo[];
      companies: CompanyDataType[];
    }>
  >;
}

const ManagerMenu = ({
  manager,
  setIsEditManager,
  setInactivateSheet,
}: ManagerMenuProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleSuccess = () => {};

  const { mutate: activateManager, isLoading: isSubmitting } =
    useActivateManager(handleSuccess, "admin");

  const { mutate: inactivateManager, isLoading: isInactivating } =
    useInactivateManager(() => {}, "admin");

  const setInactivatingManager = useBoundStore(
    (state) => state.setInactivatingManager,
  );

  const updateTeamLeads = useBoundStore((state) => state.updateTeamLeads);

  const updateCompanies = useBoundStore((state) => state.updateCompanies);

  const { data: teamLeads, isLoading: isTeamLeadsLoading } =
    useGetTeamLeadsForAdminUnderManager(manager.managerId);

  const { data: companies, isLoading: isCompaniesLoading } =
    useGetCompaniesForAdminUnderManager(manager.managerId);

  if (teamLeads) {
    updateTeamLeads(teamLeads);
  }

  if (companies) {
    updateCompanies(companies);
  }

  const onOpenChange = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditManager({ isDialogOpen: true, manager });
  };

  const handleInactive = () => {
    if (teamLeads && companies) {
      if (teamLeads.length === 0 && companies.length === 0) {
        inactivateManager({
          managerId: manager.managerId,
          data: { companies: [], teamLeads: [] },
        });
      } else {
        setInactivateSheet({
          isSheetOpen: true,
          teamLeads,
          companies,
        });
      }
    }

    setInactivatingManager(manager);
  };

  const handleActivate = () => {
    activateManager({ managerId: manager.managerId });
  };
  return (
    <>
      <DropdownMenu open={isOpenMenu} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger className="focus:outline-none">
          <MoreVertical
            size={20}
            className="transition-all group-hover:scale-110 group-hover:text-brand-blue"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="left"
          className="font-semibold text-brand-black"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick();
            }}
          >
            Edit
          </DropdownMenuItem>

          {manager.docStatus === "active" ? (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleInactive();
              }}
              disabled={
                isTeamLeadsLoading || isCompaniesLoading || isInactivating
              }
            >
              {isTeamLeadsLoading ||
                (isCompaniesLoading && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ))}
              Inactivate
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleActivate();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Activating...
                </>
              ) : (
                "Activate"
              )}{" "}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ManagerMenu;
