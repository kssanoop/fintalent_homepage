import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddData } from "@/features/ProfileEdit/WorkHistory/api/updateWorkHistory";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { ResumeVideo } from "@/features/profile/candidate/schema/candidate-profile-schema";
import { useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface VideoDropzoneProps {
  refetch: () => void;
}

function VideoDropzone({ refetch }: VideoDropzoneProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        uploadFile(file);
      } else {
        toast.error("Please drop a valid video file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  function handleError(data: any) {
    toast.error("File upload failed");
  }

  function handleSuccess(data: string, fileData: File, progress: string) {
    console.log("Data received", data);
    console.log("File Data", fileData);
    toast.success("File upload successful");
    if (fileData.type.includes("video")) {
      form.setValue("originalName", fileData.name);
      const storageName = new URL(data).pathname;
      form.setValue("storageName", storageName);

      const updatedDat = {
        originalName: fileData.name,
        storageName,
      };

      const resumeVideoData = {
        resumeVideo: updatedDat,
      };

      uploadVideo(resumeVideoData);
    }
  }

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

  const {
    isLoading: videoSubmitting,
    // isError: videUploadError,
    mutate,
  } = useFileUploadToS3(handleSuccess, handleError, onUploadProgress);
  const queryClient = useQueryClient();
  const handleDataUploadSuccess = (data: any) => {
    toast.success(data?.message);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    refetch();
  };

  const { mutate: uploadVideo } = useAddData(
    handleDataUploadSuccess,
    handleError,
  );

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    if (targetFile) {
      setVideoFile(targetFile);
      uploadFile(targetFile);
    }
  };

  const uploadFile = (file: File) => {
    mutate({ fileData: file, fileType: "resumeVideo" });
  };

  const form = useForm<ResumeVideo>({
    defaultValues: {
      originalName: "",
      storageName: "",
    },
  });

  const onSubmit: SubmitHandler<ResumeVideo> = (values) => {
    console.log("video values", values);
    // uploadVideo(values);
  };
  const videoRef = useRef<HTMLInputElement>(null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="storageName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-3">
                  {!isUploading && !videoFile && !videoSubmitting ? (
                    <div
                      className="dropzone"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {
                        <div className="flex flex-col items-center justify-center gap-2 md:py-3.5">
                          <p className="text-base font-medium text-[#034A9A]">
                            Drag and drop files here
                          </p>
                          <h4 className="text-xs font-medium text-[#A9A9A9]">
                            OR
                          </h4>
                          <div
                            onClick={() => {
                              videoRef.current?.click();
                            }}
                          >
                            <Input
                              type="file"
                              accept="video/*"
                              ref={videoRef}
                              onChange={handleUpload}
                              id="fileInput"
                              className="hidden"
                            />
                            <Button className="md:w-32" variant="secondary">
                              Upload Video
                            </Button>
                          </div>
                        </div>
                      }
                    </div>
                  ) : (
                    <div className="dropzone flex h-full w-full flex-col items-center gap-2 md:py-[34px]">
                      <h4 className="text-base font-medium text-[#034A9A]">
                        Uploading file
                      </h4>
                      {/* <div
                        className="h-10 w-10"
                        onClick={() => {
                          setVideoFile(null);
                          setIsUploading(false);
                          setUploadPercentage(0);
                          if (videoRef.current) {
                            videoRef.current.value = "";
                          }
                        }}
                      >
                        <CircularProgressbar
                          value={uploadPercentage}
                          maxValue={100}
                          text={"X"}
                          styles={buildStyles({
                            pathColor: "#00BA70",
                            textColor: "#000",
                            textSize: 24,
                          })}
                        />
                      </div> */}

                      <div
                        className="h-14 w-14"
                        style={{ position: "relative" }}
                      >
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
                        {isUploading && (
                          <div
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                              width: "100%",
                              height: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              // Handle cancellation here, e.g., stop the upload or reset the state
                              setIsUploading(false);
                              setUploadPercentage(0);
                              // You may also want to cancel the ongoing upload request
                              // and reset the file input value if needed
                              if (videoRef.current) {
                                videoRef.current.value = "";
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default VideoDropzone;
