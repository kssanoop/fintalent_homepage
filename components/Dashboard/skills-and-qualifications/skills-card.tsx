import { useState } from "react";
import SkillsAndQualificationsCard from "./skills-and-qualifications-card";
import SkillsAndQualificationsDialog from "./skills-and-qualifications-dialog";
import SkillsAdditionForm from "./skills-addition-form";
import SkillsAdded from "./skills-added";

const SkillsCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpenChange = (value: boolean) => {
    setIsDialogOpen(value);
  };
  return (
    <>
      <SkillsAndQualificationsCard
        onClick={() => {
          handleDialogOpenChange(true);
        }}
      >
        <SkillsAndQualificationsCard.Heading>
          Skills
        </SkillsAndQualificationsCard.Heading>
        <SkillsAndQualificationsCard.Description>
          Candidate/Recruiters can only select these skills you&apos;ve added
        </SkillsAndQualificationsCard.Description>
      </SkillsAndQualificationsCard>

      <SkillsAndQualificationsDialog
        open={isDialogOpen}
        handleOpenChange={handleDialogOpenChange}
      >
        <SkillsAndQualificationsDialog.Header
          title="Skills"
          description="Candidates can only select these skills you've added"
        />

        <SkillsAdditionForm />
        <SkillsAdded />
      </SkillsAndQualificationsDialog>
    </>
  );
};

export default SkillsCard;
