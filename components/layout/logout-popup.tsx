import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface LogoutPopupProps {
  onLogout: () => void;
  onCancel: () => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const LogoutPopup = ({
  onLogout,
  onCancel,
  isOpen,
  setOpen,
}: LogoutPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <div className="flex flex-col gap-8">
            <div className="text-base font-normal text-[#171717]">
              Doing this will Logout You from your account
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant={"outline"}
                className="border border-solid border-[#CDCDCD] text-base font-bold text-[#5E5E5E]"
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                variant={"secondary"}
                className="bg-[#E72F2F] text-base font-bold"
                onClick={() => {
                  onLogout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutPopup;
