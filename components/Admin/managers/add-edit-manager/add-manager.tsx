import { Button } from "@/components/ui/button";
import AddEditManagerDialog from "./add-edit-manager-dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddManagerForm from "./add-manager-form";

const AddManager = () => {
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
        Add Manager <Plus color="#fff" size={22} />
      </Button>
      <AddEditManagerDialog
        title="Add new Manager"
        formComponent={<AddManagerForm setOpen={setIsAddManagerDialogOpen} />}
        open={isAddManagerDialogOpen}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default AddManager;
