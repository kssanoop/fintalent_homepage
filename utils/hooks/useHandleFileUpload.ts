import {
  UploadInterface,
  useFileUploadToS3,
} from "@/features/auth/api/upload-s3";
import { useUploadPercentge } from "./useUploadPercentage";
import { AxiosProgressEvent } from "axios";

export const useHandleFileUpload = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any, fileData: File) => void;
  onError: (error: any) => void;
}) => {
  const { uploadPercentage, setUploadPercentage } = useUploadPercentge();

  const uploadProgress = (progress: AxiosProgressEvent) => {
    setUploadPercentage(progress);
  };

  const handleSuccess = (data: any, fileData: File) => {
    onSuccess(data, fileData);
    setUploadPercentage(null);
  };

  const handleError = (error: any) => {
    onError(error);
  };

  const {
    mutate,
    isLoading: isUploading,
    isSuccess: isUploadSuccess,
  } = useFileUploadToS3(handleSuccess, handleError, uploadProgress);

  const handleUpload = ({ fileData, fileType }: UploadInterface) => {
    mutate({ fileData, fileType });
  };
  return { handleUpload, isUploading, isUploadSuccess, uploadPercentage };
};
