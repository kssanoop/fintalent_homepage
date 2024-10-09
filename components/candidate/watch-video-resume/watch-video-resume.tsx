import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/utils/cnHelper";

const WatchVideoResume = ({
  src,
  handleClick,
  buttonClassName,
}: {
  src: string;
  handleClick?: () => void;
  buttonClassName?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => {
          e.stopPropagation();
          if (handleClick) handleClick();
        }}
        className="w-full sm:w-auto"
      >
        <Button
          //  onClick={(e) => {
          //   console.log("sdsd")
          //   e.stopPropagation();
          // }}
          variant="outline"
          className={cn(
            "mt-2 w-full border-border bg-white font-bold md:mt-0 md:w-[172px]",
            buttonClassName,
          )}
        >
          Watch video resume
        </Button>
      </DialogTrigger>
      <DialogContent
        isDefaultCloseVisible={false}
        className="bg-brand-black/50 p-0"
      >
        <video
          onClick={(e) => {
            e.stopPropagation();
          }}
          controls
          autoPlay
          className="h-full w-full"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${src}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <DialogClose
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute right-8 top-6 rounded-sm opacity-70  transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default WatchVideoResume;
