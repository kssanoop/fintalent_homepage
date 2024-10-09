import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { useAddData } from "@/features/ProfileEdit/WorkHistory/api/updateWorkHistory";
import { ResumeVideo } from "@/features/profile/candidate/schema/candidate-profile-schema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";

function VideoUpload() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const videoRef = useRef<HTMLInputElement>(null);

  const handleError = () => {
    toast.error("File upload failed");
  };

  const handleSuccess = (data: string, fileData: File, progress: string) => {
    console.log("Data received", data);
    console.log("File Data", fileData);
    toast.success("File upload successful");

    if (fileData.type.includes("video")) {
      form.setValue("originalName", fileData.name);
      const storageName = new URL(data).pathname;
      form.setValue("storageName", storageName);

      const updatedData = {
        originalName: fileData.name,
        storageName,
      };

      const resumeVideoData = {
        resumeVideo: updatedData,
      };

      uploadVideo(resumeVideoData);
    }
  };

  const onUploadProgress = (progressEvent: any) => {
    setIsUploading(true);
    if (progressEvent) {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total;

      // Calculate the percentage
      const percentage = Math.round((loaded * 100) / total);

      console.log("Upload Progress:", percentage + "%");
      setUploadPercentage(percentage);
    }
  };

  const { isLoading: videoSubmitting, mutate } = useFileUploadToS3(
    handleSuccess,
    handleError,
    onUploadProgress,
  );
  const queryClient = useQueryClient();

  const handleDataUploadSuccess = (data: any) => {
    toast.success(data?.message);
  };

  const { mutate: uploadVideo } = useAddData(
    handleDataUploadSuccess,
    handleError,
  );

  const form = useForm<ResumeVideo>({
    defaultValues: {
      originalName: "",
      storageName: "",
    },
  });

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    if (targetFile) {
      setVideoFile(targetFile);
      uploadFile(targetFile);
    }
  };

  const uploadFile = (file: File) => {
    mutate({ fileData: file, fileType: "resumeVideo" });
  };

  return (
    <div className="w-1/2">
      <FormLabel className="mb-4 block">Video Resume</FormLabel>
      <div
        className="flex cursor-pointer items-center justify-between rounded-[5px] border border-solid border-[#E1E1E1] bg-[#FFF] p-4"
        onClick={() => videoRef.current?.click()}
      >
        <label htmlFor="profileVideo" className="flex-grow">
          <Input
            id="profileVideo"
            type="file"
            accept="video/*"
            placeholder="Video Resume"
            onChange={handleVideoUpload}
            ref={videoRef}
            className="hidden"
          />
        </label>
        <Button variant="outline" className="text-base font-medium">
          Browse file
        </Button>
      </div>
      {isUploading && (
        <div className="dropzone flex h-full w-full flex-col items-center gap-2 md:py-[34px]">
          <h4 className="text-base font-medium text-[#034A9A]">
            Uploading file
          </h4>
          <div className="h-14 w-14" style={{ position: "relative" }}>
            <CircularProgressbar
              value={uploadPercentage}
              maxValue={100}
              text={isUploading ? "X" : ""}
              styles={buildStyles({
                pathColor: "#00BA70",
                textColor: "#000",
                textSize: 24,
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
