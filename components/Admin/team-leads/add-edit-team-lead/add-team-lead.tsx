import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddEditTeamLeadDialog from "./add-edit-team-lead-dialog";
import AddTeamLeadForm from "./add-team-lead-form";
import { RoleTypes } from "@/types/authorization";

const AddTeamLead = ({ role = "admin" }: { role?: RoleTypes }) => {
  const [isAddManagerDialogOpen, setIsAddManagerDialogOpen] = useState(false);

  const handleOpen = (arg: boolean) => {
    setIsAddManagerDialogOpen(arg);
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsAddManagerDialogOpen(true);
        }}
        variant="gradient"
        className=" whitespace-pre px-3 py-1.5 text-base font-bold"
      >
        Add Team Lead <Plus color="#fff" size={16} />
      </Button>
      <AddEditTeamLeadDialog
        title="Add new Team Lead"
        formComponent={
          <AddTeamLeadForm setOpen={setIsAddManagerDialogOpen} role={role} />
        }
        open={isAddManagerDialogOpen}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default AddTeamLead;
