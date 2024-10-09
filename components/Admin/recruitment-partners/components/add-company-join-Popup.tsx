import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCompanyForm from "@/features/recuitment-partners/admin/add-company-form";
import { companyRequestPendingDataType } from "@/features/recuitment-partners/admin/type/company-pending-request-type";
import React, { Dispatch, SetStateAction } from "react";

interface AddCompanyJoinPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  companyData: companyRequestPendingDataType;
}

const AddCompanyJoinPopup = ({
  open,
  setOpen,
  companyData,
}: AddCompanyJoinPopupProps) => {
  console.log("data received in form:", companyData);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[681px] p-0">
          <div className="flex flex-col gap-[18px] px-7 py-6">
            <DialogHeader>
              <DialogTitle className=" text-bold text-xl text-[#171717]">
                Company Creation Request
              </DialogTitle>
            </DialogHeader>
            {/* body/form */}
            <div className="flex flex-col gap-6">
              {/* image with details */}
              <div className="flex gap-1.5">
                <CardIcon className="h-11 w-11 items-center justify-center rounded-full">
                  <CardIconImage
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full"
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${companyData?.profilePhoto?.storageName}`}
                    alt="profileImage"
                  />
                  <CardIconFallback>{companyData?.fullName}</CardIconFallback>
                </CardIcon>
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold text-[#171717]">
                    {companyData?.fullName}
                  </h3>
                  <p className="text-sm font-medium text-[#5E5E5E]">
                    <a href={`mailto:${companyData?.email}`}>
                      {" "}
                      {companyData?.email}
                    </a>
                  </p>
                </div>
              </div>
              {/* join text */}
              <h4 className="text-base font-medium text-[#5E5E5E]">
                have requested to create a new company.
              </h4>
              {/* company Image */}
              {/* <div>
                <CardIcon>
                  <CardIconImage
                    width={62}
                    height={62}
                    className=" h-16 w-16 rounded-sm"
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${companyData?.companyId?.companyLogo?.storageName}`}
                    alt="profileImage"
                  />
                  <CardIconFallback>
                    {companyData?.companyId?.companyName}
                  </CardIconFallback>
                </CardIcon>
              </div> */}
              {/* form */}

              <AddCompanyForm
                setOpen={setOpen}
                type={"EditCompany"}
                companyData={companyData?.companyId}
                recruiterId={companyData?.recruiterId}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCompanyJoinPopup;
