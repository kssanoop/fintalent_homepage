import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleFileUpload } from "@/utils/hooks/useHandleFileUpload";
import { useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const ResumeVideoUploadContainer = ({
  handleRemove,
  isFileSizeExceed,
  handleSuccess,
  handleError,
  errorMessage,
  field,
  form,
}: {
  handleRemove: () => void;
  isFileSizeExceed: (
    file: File,
    fileType: "resumeVideo" | "resumeVideo",
    maxSize: number,
  ) => boolean;
  handleSuccess: (data: any, fileData: File) => void;
  handleError: (error: any) => void;
  errorMessage: string | undefined;
  field: any;
  form: any;
}) => {
  // const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUpload, isUploading, isUploadSuccess, uploadPercentage } =
    useHandleFileUpload({
      onSuccess: handleSuccess,
      onError: handleError,
    });

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    if (targetFile) {
      // setFile(targetFile);

      if (isFileSizeExceed(targetFile, "resumeVideo", 30 * 1024 * 1024)) return;

      if (targetFile)
        handleUpload({ fileData: targetFile, fileType: "resumeVideo" });
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const uploadValue = uploadPercentage
    ? parseInt(uploadPercentage.slice(0, -1))
    : 0;

  return (
    <>
      <div className="flex h-[62px] cursor-pointer items-center justify-end rounded-[5px] border border-solid border-[#E1E1E1] bg-[#FFF] p-4">
        {!form.getValues("resumeVideo.storageName") && !isUploading && (
          <label htmlFor="profileVideo">
            <Input
              id="profileVideo"
              type="file"
              accept="video/*"
              placeholder="Video Resume"
              onChange={handleResumeUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              onClick={handleBrowseClick}
              type="button"
              variant="outline"
              className="text-base font-medium"
            >
              Browse file
            </Button>
          </label>
        )}
        {!form.getValues("resumeVideo.storageName") && isUploading && (
          <div className="flex w-full justify-between font-medium">
            <p className="text-secondary">Uploading file</p>
            <div className="h-8 w-8">
              <CircularProgressbar
                value={uploadValue}
                maxValue={100}
                text={isUploading ? "" : ""}
                styles={buildStyles({
                  pathColor: "#00BA70",
                  textColor: "#000",
                  textSize: 24,
                })}
              />
            </div>
          </div>
        )}
        {form.getValues("resumeVideo.storageName") && !isUploading && (
          <>
            <div className="flex w-full justify-between text-secondary">
              <p>{isUploadSuccess ? "File uploaded" : "Upload file"}</p>
              <div
                onClick={() => {
                  handleRemove();
                  form.setValue("resumeVideo.storageName", null);

                  // setFile(null);
                }}
              >
                X
              </div>
            </div>
          </>
        )}
      </div>
      {/* {errorMessage && (
        <p className={"mt-2 text-sm font-medium text-destructive"}>
          {errorMessage}
        </p>
      )} */}
    </>
  );
};

export default ResumeVideoUploadContainer;
