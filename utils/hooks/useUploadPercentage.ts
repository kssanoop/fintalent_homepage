import { AxiosProgressEvent } from "axios";
import { useState } from "react";

export const useUploadPercentge = () => {
  const [uploadPercentage, setUploadPercentage] = useState<string | null>(null);

  const uploadProgress = (progress: AxiosProgressEvent | null) => {
    const percentage =
      progress !== null
        ? `${Math.round((progress.loaded / (progress?.total ?? 0)) * 100)}%`
        : null;
    setUploadPercentage(percentage);
  };

  return { uploadPercentage, setUploadPercentage: uploadProgress };
};
