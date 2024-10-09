import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Clock3, Pencil as EditIcon } from "lucide-react";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import AddSkillDialog from "./add-skill-Dialog";
import EditSkillDialog from "./edit-skill-dilaog";
import { ROLES } from "@/types/authorization";
import ApproveOrRejectSkillDialog from "./approve-or-reject-skill/approve-or-reject-skill-dialog";

interface CandidateSkillProps {
  skills: Array<{
    name: string;
    level: string;
  }>;
  pendingSkills: Array<{
    name: string;
    level: string;
  }>;
  pending?: boolean;
  Interface: string;
}

const SKILL_APPROVAL_AUTHORISED_ROLES = ["admin", "manager", "teamlead"];

const SkillCard = ({
  skills,
  pendingSkills,
  pending,
  Interface,
}: CandidateSkillProps) => {
  const [openSkillAdd, setOpenSkillAdd] = useState(false);
  const [openSkillEdit, setOpenSkillEdit] = useState(false);
  const [openSkillApproval, setOpenSkillApproval] = useState(false);
  const handleAddSkillDialogClick = (event: any) => {
    setOpenSkillAdd(true);
  };
  const handleEditSkillDialogClick = (event: any) => {
    setOpenSkillEdit(true);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xs font-semibold tracking-[1.92px] text-[#171717]">
              TOP SKILLS
            </CardTitle>
            {Interface === ROLES.CANDIDATE && (
              <EditIcon
                fill="#A9A9A9"
                color="white"
                size={16}
                className="cursor-pointer"
                onClick={handleEditSkillDialogClick}
              />
            )}
          </div>
          {Interface === ROLES.CANDIDATE && (
            <p
              className="cursor-pointer text-[#3790E3]"
              onClick={handleAddSkillDialogClick}
            >
              Add new +
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-[14px]">
            <SkillCardList
              skillList={skills}
              totalRating={10}
              className="text-sm"
            />
          </div>
          {Interface === ROLES.CANDIDATE && pendingSkills?.length > 0 && (
            <div className="flex flex-col gap-1 pt-4">
              <div className="flex items-center gap-1">
                <Clock3 size={20} strokeWidth={2} color="#A9A9A9" />
                <p className="text-sm font-normal text-[#5E5E5E]">
                  {pendingSkills?.length} Skills pending confirmation
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <SkillCardList
                  className="text-sm"
                  skillList={pendingSkills}
                  totalRating={10}
                  pending={pending}
                />
              </div>
            </div>
          )}
          {SKILL_APPROVAL_AUTHORISED_ROLES.includes(Interface) &&
            pendingSkills?.length > 0 && (
              <div
                onClick={() => {
                  setOpenSkillApproval(true);
                }}
                className="mt-3 flex cursor-pointer items-center justify-between rounded-lg border border-[rgba(1,42,89,0.5)] bg-[rgba(3,74,154,0.17)] px-[14px] py-3 transition-all hover:shadow"
              >
                <div className="space-y-1 text-brand-black">
                  <p className="font-extrabold">
                    {pendingSkills?.length} skills
                  </p>
                  <p className="text-sm font-semibold">Pending confirmation</p>
                </div>
                <ChevronRight />
              </div>
            )}
        </CardContent>
      </Card>
      <AddSkillDialog open={openSkillAdd} setOpen={setOpenSkillAdd} />
      <EditSkillDialog
        open={openSkillEdit}
        setOpen={setOpenSkillEdit}
        skills={skills}
        pendingSkills={pendingSkills}
      />
      <ApproveOrRejectSkillDialog
        open={openSkillApproval}
        handleOpen={(value) => {
          setOpenSkillApproval(value);
        }}
        pendingSkills={pendingSkills}
      />
    </>
  );
};

export default SkillCard;
