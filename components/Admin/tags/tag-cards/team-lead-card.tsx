import { Pencil } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import AssignMoreTeamLeadsPopup from "../team-lead-assign-popups/assign-more-team-leads";
import { teamleads } from "@/features/tags/type/tags-info";
import { usePathname } from "next/navigation";

interface TeamLeadCardProps {
  tagId: string;
  teamleads: teamleads;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  docStatus: string;
}

const TeamLeadCard = ({
  tagId,
  teamleads,
  setOpen,
  open,
  docStatus,
}: TeamLeadCardProps) => {
  const pathName = usePathname();
  return (
    <>
      <div>
        {teamleads?.length === 0 && !pathName.includes("/manager/tags") ? (
          <>
            {docStatus === "active" ? (
              <div
                className="cursor-pointer rounded-[8px] border-[1.5px] border-solid border-[#CDCDCD] 
        p-2.5 text-sm font-medium text-[#000000]"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                Assign Team Lead
              </div>
            ) : (
              <div>No Team Lead assigned</div>
            )}
          </>
        ) : (
          <div className="flex gap-[7px]">
            <p className="text-sm font-normal text-[#5E5E5E]">
              Team Lead assigned :
            </p>
            <span className="flex gap-0.5 text-sm font-semibold text-[#171717]">
              {teamleads[0]?.name}{" "}
              {teamleads.length - 1 > 0 && (
                <p>
                  {""}+{teamleads?.length - 1} more
                </p>
              )}
            </span>
            {!pathName?.includes("/manager/tags") && (
              <>
                {docStatus === "active" && (
                  <Pencil
                    strokeWidth={2}
                    size={16}
                    color="#5E5E5E"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
      <AssignMoreTeamLeadsPopup
        open={open}
        setOpen={setOpen}
        teamleads={teamleads}
        tagId={tagId}
      />
    </>
  );
};

export default TeamLeadCard;
