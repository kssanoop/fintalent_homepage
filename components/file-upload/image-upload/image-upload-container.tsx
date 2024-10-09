import ImageUpload from "./image-upload";
import { useHandleFileUpload } from "@/utils/hooks/useHandleFileUpload";

const ImageUploadContainer = ({
  handleRemove,
  isImageSizeExceed,
  handleSuccess,
  handleError,
  errorMessage,
  defaultPhotoUrl = "",
}: {
  handleRemove: () => void;
  isImageSizeExceed: (imageFile: File) => boolean;
  handleSuccess: (data: any, fileData: File) => void;
  handleError: (error: any) => void;
  errorMessage: string | undefined;
  defaultPhotoUrl?: string;
}) => {
  const { handleUpload, isUploading, uploadPercentage } = useHandleFileUpload({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleImageUpload = (imageFile: File) => {
    if (isImageSizeExceed(imageFile)) return;
    handleUpload({ fileData: imageFile, fileType: "profilePicture" });
  };

  return (
    <>
      <ImageUpload
        defaultPhotoUrl={defaultPhotoUrl}
        handleUpload={handleImageUpload}
        handleRemove={handleRemove}
        errorMessage={errorMessage}
        uploadPercentage={uploadPercentage}
        isUploading={isUploading}
      />
    </>
  );
};

export default ImageUploadContainer;
