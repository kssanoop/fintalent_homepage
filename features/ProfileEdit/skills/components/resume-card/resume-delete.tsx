import { useAddData } from "@/features/ProfileEdit/WorkHistory/api/updateWorkHistory";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

const ResumeDelete = () => {
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success("Resume deleted successfully");
  };
  const handleError = () => {
    toast.error("Error occured while  Deleting Resume");
  };
  const { mutate: deleteResume, isLoading: isDeleting } = useAddData(
    handleSuccess,
    handleError,
  );
  const handleClick = () => {
    deleteResume({ resumeDocument: { originalName: "", storageName: "" } });
  };

  if (isDeleting) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return <Trash onClick={handleClick} size="16" className="cursor-pointer" />;
};

export default ResumeDelete;
