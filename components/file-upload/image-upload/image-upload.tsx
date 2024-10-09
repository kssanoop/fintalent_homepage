// import Image from "next/image";
import { Input } from "../../ui/input";
import { useRef, useState } from "react";
import ImageCrop from "../../image-crop/image-crop";
import { Camera, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export type ImageUploadProps = {
  handleUpload: (file: File) => void;
  handleRemove: () => void;
  errorMessage: string | undefined;
  required?: boolean;
  uploadPercentage?: string | null;
  isUploading: boolean;
  imagePlaceholder?: any;
  defaultPhotoUrl?: string;
};

const ImageUpload = ({
  handleUpload,
  handleRemove,
  errorMessage,
  required = false,
  uploadPercentage = null,
  isUploading = false,
  imagePlaceholder,
  defaultPhotoUrl,
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [photoURLForCrop, setPhotoURLForCrop] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(defaultPhotoUrl);
  const photoRef = useRef<HTMLInputElement>(null);

  const onImageSubmit = (url: string) => {
    if (file) {
      fetch(url)
        .then(async (res) => await res.blob())
        .then((blob) => {
          const uniqueFileName = uuidv4();
          const newFile = new File([blob], uniqueFileName);
          handleUpload(newFile);
          setPhotoURL(url);
        });
      // const newFile = new File([blob], file.name, { type: file.type });
      // handleUpload(newFile);
      // setPhotoURL(url);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      const uniqueFileName = uuidv4() + file.name.split(".").pop();
      const newFile = new File([file], uniqueFileName);
      setFile(newFile);
      setPhotoURLForCrop(URL.createObjectURL(newFile));
      setOpenCrop(true);
    }
  };

  return !openCrop ? (
    <>
      {!isUploading ? (
        <>
          <div
            className=" flex w-fit gap-x-4"
            onClick={() => {
              photoRef.current?.click();
            }}
          >
            <Input
              name="profilepic"
              type="file"
              className="hidden"
              ref={photoRef}
              required={required}
              accept="image/jpeg, image/jpg, image/png"
              id="profilepic"
              onChange={handleChange}
            />
            {/* <Image
              src={photoURL || imagePlaceholder}
              width={90}
              height={90}
              className={`h-[90px] w-[90px] rounded-full ${
                file && "border-2"
              } border-brand-blue object-center`}
              alt="Profile image placeholder"
            /> */}
            <Avatar
              className={`h-[90px] w-[90px] ${
                file && "border-2"
              } border-brand-blue object-center`}
            >
              <AvatarImage src={photoURL} />
              <AvatarFallback>
                {imagePlaceholder || <Camera className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <button className="font-medium text-link" type="button">
              {photoURL ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoURL("");
                    if (photoRef.current) photoRef.current.value = "";
                    handleRemove();
                  }}
                  className="font-medium text-destructive"
                  type="button"
                >
                  Remove photo
                </button>
              ) : (
                <button className="font-medium text-link" type="button">
                  Upload photo
                </button>
              )}
            </button>
          </div>
          {errorMessage && (
            <p className={"mt-2 text-sm font-medium text-destructive"}>
              {errorMessage}
            </p>
          )}
        </>
      ) : (
        <div className="flex h-[90px] w-[90px] items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-brand-blue" />
          <span className="text-brand-blue">{uploadPercentage}</span>
        </div>
      )}
    </>
  ) : (
    <ImageCrop
      {...{
        photoURLForCrop,
        setPhotoURLForCrop,
        setFile,
        isDialogOpen: openCrop,
        setIsDialogOpen: setOpenCrop,
        imageSubmit: onImageSubmit,
      }}
    />
  );
};

export default ImageUpload;
