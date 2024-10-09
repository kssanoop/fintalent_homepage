import React, { useState } from "react";
import TLDialog from "./TL-dialog";
import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";

interface TLNotAssignedProps {
  candidateId: string;
  defaultTeamLead: string | undefined;
}

const TLNotAssigned = ({
  candidateId,
  defaultTeamLead,
}: TLNotAssignedProps) => {
  console.log(defaultTeamLead);
  const [showhandleTLDialog, sethandleTLDialog] = useState(false);
  const { data, isLoading } = useGetTeamLeadsForAdmin();
  // console.log("default team leads:", defaultTeamLead);
  const currentTL = data?.filter(
    (item) => defaultTeamLead && item?.teamLeadId === defaultTeamLead,
  );
  // console.log("default team leads:", currentTL);
  return (
    <>
      <div
        className="flex cursor-pointer justify-center rounded-[5px] border border-solid border-[#012A59] p-3"
        onClick={() => {
          sethandleTLDialog(true);
        }}
      >
        <p className=" text-sm font-bold text-[#012A59]">
          {defaultTeamLead ? (
            <div className="flex items-center gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M14.3067 5.195C14.5667 4.935 14.5667 4.50167 14.3067 4.255L12.7467 2.695C12.5 2.435 12.0667 2.435 11.8067 2.695L10.58 3.915L13.08 6.415M2.5 12.0017V14.5017H5L12.3733 7.12167L9.87333 4.62167L2.5 12.0017Z"
                  fill="#012A59"
                />
              </svg>
              {currentTL?.[0]?.name}
            </div>
          ) : (
            "Assign Team Lead +"
          )}
        </p>
      </div>
      <TLDialog
        open={showhandleTLDialog}
        setOpen={sethandleTLDialog}
        candidateId={candidateId}
        defaultTeamLead={defaultTeamLead}
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};

export default TLNotAssigned;
