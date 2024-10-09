// useFileUploadToS3.ts

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

interface UploadInterface {
  fileData: File;
  fileType: string;
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
    data, // Change this line
    onUploadProgress,
    transformRequest: (data, headers) => {
      delete headers.authorization;
      console.log(data);
      return data;
    },
  });
};

// export const useToUploadS3 = async (
//   files: Array<{ fileData: File; fileType: string; index: number }>, // Add 'index' to the type
//   handleSuccess: any,
//   handleError: any,
//   onUploadProgress?: any,
// ) => {
//   const uploadPromises = files.map(async (file) => {
//     const { fileData, fileType, index } = file; // Extract 'index'
//     const s3URL = await generateS3URL({ fileData, fileType });
//     await uploadToS3({
//       s3URL,
//       fileData,
//       onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//         onUploadProgress(progressEvent, index); // Pass 'index' if needed
//       },
//     });
//     return s3URL;
//   });

//   const fileUrls = await Promise.all(uploadPromises);
//   handleSuccess(fileUrls);
// };

export const useToUploadS3 = (
  files: Array<{ fileData: File; fileType: string }>,
  handleSuccess: any,
  handleError: any,
  onUploadProgress?: any,
) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      const uploadPromises = files.map(async (file) => {
        const s3URL = await generateS3URL(file);
        await uploadToS3({
          s3URL,
          fileData: file.fileData,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            onUploadProgress(progressEvent);
          },
        });
        return s3URL;
      });

      const fileUrls = await Promise.all(uploadPromises);
      handleSuccess(fileUrls);
    },
    onError: handleError,
  });

  return { isLoading, mutate };
};
