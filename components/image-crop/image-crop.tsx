import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import {
  Content as RadixDialogContent,
  Close as RadixDialogClose,
} from "@radix-ui/react-dialog";
import Cropper, { Area } from "react-easy-crop";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import getCroppedImg from "./utils/crop-image";
import { Loader2, X } from "lucide-react";

type ImageCropProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  photoURLForCrop: string;
  setPhotoURLForCrop: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  imageSubmit: (url: string) => void;
};

const ImageCrop = ({
  isDialogOpen,
  setIsDialogOpen,
  photoURLForCrop,
  setPhotoURLForCrop,
  setFile,
  imageSubmit,
}: ImageCropProps) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        photoURLForCrop,
        croppedAreaPixels,
        rotation,
      );
      setPhotoURLForCrop(url);
      setFile(file);
      setIsDialogOpen(false);
      imageSubmit(url as string);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* <DialogContent className="max-w-xl p-0 data-[state=open]:animate-none"> */}
      {/* TODO: format the below comment */}
      {/* NOTE: Replacing DialogContent from ui/dialog with radix components to change the animate-in animation, 
      Since, animate-in animation effects the Cropper (visit: https://github.com/ValentinH/react-easy-crop/issues/498) */}
      <DialogPortal>
        <DialogOverlay />
        <RadixDialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-6 rounded-md border bg-white p-0 px-8 py-6 shadow-lg duration-200 data-[state=open]:animate-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
          <div className="relative h-[40vh]">
            <Cropper
              image={photoURLForCrop}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              // restrictPosition={false}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={cropComplete}
            />
          </div>
          <div className="p-4">
            <div className="mb-4 space-y-2">
              <p>Zoom: {zoom}%</p>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[zoom]}
                onValueChange={(value: number[]) => {
                  setZoom(value[0]);
                }}
              />
            </div>

            <div className="mb-4 space-y-2">
              <p>Rotate: {rotation}°</p>
              <Slider
                min={0}
                max={360}
                step={1}
                value={[rotation]}
                onValueChange={(value: number[]) => {
                  setRotation(value[0]);
                }}
              />
            </div>

            <div className="mt-10 flex justify-center gap-2 md:justify-end">
              <Button
                variant={"outline"}
                className="h-[59px] w-[152px] rounded-lg border-0 px-2.5 py-4 text-xl font-bold text-brand-black"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleUpload}
                disabled={loading}
                variant="gradient"
                style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
                className=" h-[59px] w-[152px] px-2.5 py-4 text-xl font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </div>
          <RadixDialogClose className="absolute right-8 top-6 rounded-sm opacity-70  transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </RadixDialogClose>
        </RadixDialogContent>
      </DialogPortal>

      {/* </DialogContent> */}
    </Dialog>
  );
};

export default ImageCrop;
