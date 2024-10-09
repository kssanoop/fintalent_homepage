// useFileUploadToS3.ts
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

export type FileType =
  | "profilePicture"
  | "resumePdf"
  | "resumeVideo"
  | "common";
export interface UploadInterface {
  fileData: File;
  fileType: FileType;
}

const generateS3URL = async ({ fileData, fileType }: UploadInterface) => {
  console.log("entered s3url part", fileData.name);
  const data = { fileName: encodeURIComponent(fileData.name) };
  const response = await axios({
    data,
    url: `/common/generateS3url/${fileType}`,
    method: "POST",
  });
  console.log(response.data);
  return response.data;
};

const uploadToS3 = async ({
  s3URL,
  fileData,
  onUploadProgress,
}: {
  s3URL: string;
  fileData: File;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
  console.log(fileData);
  console.log("uploading to s3");
  const data = new FormData();
  data.append(fileData.name, fileData);
  // delete axios.defaults.headers.common["Authorization"];
  await axios({
    url: s3URL,
    method: "PUT",
    data: fileData,
    onUploadProgress,
    transformRequest: (data, headers) => {
      delete headers.authorization;
      console.log(data);
      return data;
    },
  });
};

export const useFileUploadToS3 = (
  handleSuccess: any,
  handleError: any,
  onUploadProgress?: (progress: AxiosProgressEvent) => void,
) => {
  return useMutation({
    mutationFn: generateS3URL,
    onMutate: (variables) => {
      return variables;
    },
    onSuccess: async (data, variables) => {
      console.log(data, variables);
      await uploadToS3({
        s3URL: data,
        fileData: variables.fileData,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onUploadProgress) onUploadProgress(progressEvent);
        },
      });
      handleSuccess(data, variables.fileData);
    },
  });
};
