import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import AddEditTeamLeadDialog from "../../add-edit-team-lead/add-edit-team-lead-dialog";
import EditTeamLeadForm from "../../add-edit-team-lead/edit-team-lead-form";
import { RoleTypes } from "@/types/authorization";
import TeamLeadInactivateSheet from "@/features/inactivate/team-lead/team-lead-inactivate-sheet";
import { useBoundStore } from "@/store/useBoundStore";
import useGetCandidatesUnderTeamLeadForAdmin from "@/features/admin/team-lead/api/get-candidates-under-team-lead-for-admin";
import { useActivateTeamLead } from "@/features/inactivate/api/activate-team-lead";
import { useInactivateTeamLead } from "@/features/inactivate/api/inactivate-team-lead";
import { ToggleSwitch } from "@/components/toggle-switch";
import useUpdateCandidateApprovalPermission from "@/features/candidates/candidate-approval-permission/api/update-candidate-approval-permission";

const TeamLeadInfoCard = ({
  teamLead,
  role = "admin",
}: {
  teamLead: TeamLeadInfo;
  role?: RoleTypes;
}) => {
  const [isInactivateSheetOpen, setIsInactivateSheetOpen] = useState(false);
  const [isPermissionOn, setIsPermissionOn] = useState(
    teamLead.candidateAprovalModeStatus,
  );
  console.log(teamLead.candidateAprovalModeStatus);

  const { data: candidates, isLoading } = useGetCandidatesUnderTeamLeadForAdmin(
    {
      teamLeadId: teamLead.teamLeadId,
    },
  );

  const handleSuccess = () => {};

  const { mutate: activate, isLoading: isActivating } = useActivateTeamLead(
    handleSuccess,
    "admin",
  );

  const setInactivatingTeamLead = useBoundStore(
    (state) => state.setInactivatingTeamLead,
  );

  const updateCandidates = useBoundStore((state) => state.updateCandidates);
  const [isEditTeamLead, setisEditTeamLead] = useState<{
    isDialogOpen: boolean;
    teamLead: TeamLeadInfo;
  }>({
    isDialogOpen: false,
    teamLead: {
      teamLeadId: "",
      name: "",
      email: "",
      phoneNo: "",
      designation: "",
      employeeId: "",
      candidates: [],
      role: "",
      profilePhoto: {
        storageName: "",
        originalName: "",
      },
      candidateAprovalModeStatus: false,
    },
  });

  const { mutate: inactivateTeamLead, isLoading: isInactivating } =
    useInactivateTeamLead(handleSuccess, "admin");

  const { mutate: updateCandidateApprovalPermision } =
    useUpdateCandidateApprovalPermission();

  useEffect(() => {
    setIsPermissionOn(teamLead.candidateAprovalModeStatus);
  }, [teamLead.candidateAprovalModeStatus]);

  const handleEditDialogOpen = (arg: boolean) => {
    setisEditTeamLead((prev) => ({ ...prev, isDialogOpen: arg }));
  };

  const handleEditClick = () => {
    setisEditTeamLead({ isDialogOpen: true, teamLead });
  };

  if (candidates) {
    updateCandidates(candidates.data);
  }
  return (
    <>
      <Card className="relative flex min-h-[133px] items-center justify-between">
        <div className="flex gap-3 pl-[26px]">
          <Avatar className="h-[90px] w-[90px] border-2 shadow">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${teamLead.profilePhoto.storageName}`}
            />
            <AvatarProfileFallback />
          </Avatar>

          <div className="space-y-1 text-brand-black">
            <h3 className="text-xl font-bold">{teamLead.name}</h3>
            <div className="flex items-center gap-1 text-sm font-medium">
              <p>{teamLead.designation}</p>
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
              <p className="capitalize">{teamLead.role}</p>
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
              <p>TLID {teamLead.employeeId}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <Link
                href={`mailto:${teamLead.email}`}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <Mail size={15} color="#171717" strokeWidth={2} />
                <p>{teamLead.email}</p>
              </Link>
              <Link
                href={`tel:${teamLead.phoneNo}`}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone size={15} color="#171717" strokeWidth={2} />
                <p>{teamLead.phoneNo}</p>
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
          {teamLead.docStatus === "active" ? (
            <Button
              onClick={() => {
                if (candidates?.data.length === 0) {
                  inactivateTeamLead({
                    teamLeadId: teamLead.teamLeadId,
                    data: {
                      candidates: [],
                    },
                  });
                } else {
                  setIsInactivateSheetOpen(true);
                  setInactivatingTeamLead(teamLead);
                }
              }}
              disabled={isLoading || isInactivating}
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
                activate({ teamLeadId: teamLead.teamLeadId });
              }}
              disabled={isActivating}
              variant="outline"
              className="border-background-color bg-[#F9FDFF] font-bold text-brand-blue"
            >
              {isActivating ? (
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
        <AddEditTeamLeadDialog
          title="Edit Team Lead"
          formComponent={
            <EditTeamLeadForm
              role={role}
              teamLead={isEditTeamLead.teamLead}
              handleOpen={handleEditDialogOpen}
            />
          }
          open={isEditTeamLead.isDialogOpen}
          handleOpen={handleEditDialogOpen}
        />

        {role === "admin" && (
          <div className=" absolute bottom-2 right-4 flex items-center gap-1.5 py-1.5 text-sm">
            <p>
              Candidate approval Permission is {isPermissionOn ? "On" : "Off"}
            </p>
            <ToggleSwitch
              isOn={isPermissionOn}
              // @ts-ignore (temp fix)
              setIsOn={(value: boolean) => {
                setIsPermissionOn(value);
                updateCandidateApprovalPermision({
                  teamleadId: teamLead.teamLeadId,
                  action: value ? "enable" : "disable",
                });
              }}
            />
          </div>
        )}
      </Card>

      <TeamLeadInactivateSheet
        isSheetOpen={isInactivateSheetOpen}
        setIsSheetOpen={(value: boolean) => {
          setIsInactivateSheetOpen(value);
          !value && setInactivatingTeamLead(null);
        }}
      />
    </>
  );
};

export default TeamLeadInfoCard;
