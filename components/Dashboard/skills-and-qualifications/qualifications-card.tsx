import { useState } from "react";
import SkillsAndQualificationsCard from "./skills-and-qualifications-card";
import SkillsAndQualificationsDialog from "./skills-and-qualifications-dialog";
import QualificationsAdditionForm from "./qualifications-addition-form";
import QualificationsAdded from "./qualifications-added";

const QualificationsCard = () => {
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
          Qualifications{" "}
        </SkillsAndQualificationsCard.Heading>
        <SkillsAndQualificationsCard.Description>
          Candidate/Recruiters can only select these qualifications you&apos;ve
          added{" "}
        </SkillsAndQualificationsCard.Description>
      </SkillsAndQualificationsCard>

      <SkillsAndQualificationsDialog
        open={isDialogOpen}
        handleOpenChange={handleDialogOpenChange}
      >
        <SkillsAndQualificationsDialog.Header
          title="Qualifications"
          description="Candidates can only select these qualifications you’ve added"
        />

        <QualificationsAdditionForm />
        <QualificationsAdded />
      </SkillsAndQualificationsDialog>
    </>
  );
};

export default QualificationsCard;
