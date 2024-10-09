import NotificationButton from "@/components/notification/notification-button";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface HeaderBarProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  showFilter: boolean;
  buttonText: string;
  showButton: boolean;
}
const HeaderBar = ({
  setOpen,
  showFilter,
  title,
  buttonText,
  showButton,
}: HeaderBarProps) => {
  const router = useRouter();
  const handleCloseBuutonClick = () => {
    router.back();
    setOpen(false);
  };
  return (
    <>
      <div className="flex w-full items-center justify-between border border-b border-[#E1E1E1] bg-white px-5 py-3">
        <h2 className="text-xl font-bold text-[#171717]">{title}</h2>
        <div className="flex items-center gap-28">
          <NotificationButton />
          {showButton ? (
            <Button
              className="px-3 py-1.5 text-base font-bold"
              variant="gradient"
              onClick={() => {
                setOpen(true);
              }}
            >
              {buttonText} <Plus color="#fff" size={22} />
            </Button>
          ) : (
            <X
              size={24}
              color="#000000"
              className="mr-5 cursor-pointer"
              onClick={() => {
                handleCloseBuutonClick();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
