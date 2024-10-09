import { Input } from "@/components/ui/input";
import { useAddData } from "@/features/ProfileEdit/WorkHistory/api/updateWorkHistory";
import { useHandleFileUpload } from "@/utils/hooks/useHandleFileUpload";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { toast } from "sonner";

const ResumeAdd = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleError = () => {
    toast.error("failed to upload resume");
  };

  const handleAddSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
  };
  const { mutate: addResume, isLoading: isAdding } = useAddData(
    handleAddSuccess,
    handleError,
  );
  const handleSuccess = (data: any, fileData: File) => {
    const storageName = new URL(data).pathname;

    addResume({ resumeDocument: { originalName: fileData.name, storageName } });
  };

  const { handleUpload, isUploading, uploadPercentage } = useHandleFileUpload({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleAddResumeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    console.log(targetFile);
    if (targetFile) {
      const maxSize = 5 * 1024 * 1024;
      if (targetFile?.size && targetFile?.size > maxSize) {
        toast.error(`allowed maximum size is ${maxSize / (1024 * 1024)}mb`);
      } else {
        handleUpload({ fileData: targetFile, fileType: "resumePdf" });
      }
    }
  };

  const uploadValue = uploadPercentage
    ? parseInt(uploadPercentage.slice(0, -1))
    : 0;
  return (
    <>
      {isAdding ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isUploading ? (
        <div className="h-5 w-5">
          <CircularProgressbar
            value={uploadValue}
            maxValue={100}
            text={isUploading ? "" : ""}
            styles={buildStyles({
              pathColor: "#000",
              textColor: "#000",
              textSize: 24,
            })}
          />
        </div>
      ) : (
        <div>
          <Input
            type="file"
            id="profileDoc"
            accept="application/pdf"
            placeholder="PDF Resume"
            ref={fileInputRef}
            onChange={handleResumeUpload}
            className="hidden"
          />
          <p
            onClick={handleAddResumeClick}
            className="cursor-pointer font-medium text-brand-blue-light"
          >
            Add resume +
          </p>
        </div>
      )}
    </>
  );
};

export default ResumeAdd;
