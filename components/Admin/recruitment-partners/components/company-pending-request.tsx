import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Loader2, UserPlus } from "lucide-react";
import React, { useState } from "react";
import AddCompanyJoinPopup from "./add-company-join-Popup";
import AddRecruiterRequest from "./add-recruiter-request";
import { useGetAllCompanyListPending } from "@/features/recuitment-partners/admin/api/get-all-company-pending-list";
import AcceptColorButton from "@/features/interview/candidate/components/interview-buttons/accept-color-button";
import { companyRequestPendingDataType } from "@/features/recuitment-partners/admin/type/company-pending-request-type";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useVerifyCreateCompanyRequest } from "@/features/recuitment-partners/admin/api/verify-create-company-request";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRejectCreateCompanyRequest } from "@/features/recuitment-partners/admin/api/reject-company-requests";
import { useAcceptJoinCompanyRequest } from "@/features/recuitment-partners/admin/api/accept-company-join-request";
import { useRejectJoinCompanyRequest } from "@/features/recuitment-partners/admin/api/reject-join-company-request";

const CompanyPendingRequest = () => {
  const [openAddCompanyPopup, setOpenAddCompanyPopup] = useState(false);
  const [openAddRecruiterPopup, setOpenAddRecruiterPopup] = useState(false);
  const {
    data: pendingCompanyList,
    isLoading: isPendingCompanyListLoading,
    // isError: isPendingCompanyListError,
  } = useGetAllCompanyListPending();

  type CompanyRequestProps = {
    data: companyRequestPendingDataType;
  };

  const queryClient = useQueryClient();

  // console.log("recruiter Data:", pendingCompanyList);

  // form success submit
  const formSubmissionhandleSuccess = (data: any) => {
    toast.success(data?.message);
    queryClient.invalidateQueries({ queryKey: ["all-company-list-pending"] });
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const CompanyCreateRequest = ({ data }: CompanyRequestProps) => {
    const { companyId, recruiterId } = data || {};
    const {
      mutate: VerifyCompanyCreation,
      isLoading: isSubmitting,
      isError: isSubmittingError,
    } = useVerifyCreateCompanyRequest(
      formSubmissionhandleSuccess,
      formSubmissionhandleError,
    );

    const {
      mutate: rejectCompanyCreation,
      isLoading: isRejecting,
      isError: isRejectingError,
    } = useRejectCreateCompanyRequest(
      formSubmissionhandleSuccess,
      formSubmissionhandleError,
    );
    return (
      <>
        <Card className="w-full px-3.5 py-[13px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-0.5">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[2px] bg-[#DEAC2B33]">
                <Building2 color="#DEAC2B" size={24} />
              </div>
              {/* details */}
              <h4 className="ml-[10px] text-base font-normal text-[#171717] ">
                <span className="font-bold">{data?.fullName}</span> has
                requested to create a new company{" "}
                <span className="font-bold">{companyId?.companyName}.</span>
              </h4>
              {/* popup open */}
              <p
                className="cursor-pointer text-base font-bold text-[#3790E3]"
                onClick={() => {
                  setOpenAddCompanyPopup(true);
                }}
              >
                view details
              </p>
            </div>
            {/* button */}
            <div className="flex gap-2">
              {isSubmitting && !isSubmittingError ? (
                <AcceptColorButton title="Approving...">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </AcceptColorButton>
              ) : (
                <AcceptColorButton
                  title="Approve"
                  onClick={() => {
                    const {
                      companyLogo,
                      companyName,
                      companyPhoneNo,
                      locations,
                      companyWebsite,
                      companyLinkedIn,
                      companyEmail,
                    } = companyId;
                    VerifyCompanyCreation({
                      data: {
                        companyLogo,
                        companyName,
                        companyPhoneNo,
                        locations,
                        companyWebsite,
                        companyLinkedIn,
                        companyEmail,
                      },
                      recruiterId,
                    });
                  }}
                />
              )}
              <Button
                disabled={isRejecting || isSubmitting}
                variant={"reject"}
                onClick={() => {
                  rejectCompanyCreation({ recruiterId });
                }}
              >
                {isRejecting && !isRejectingError ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </div>
        </Card>

        <AddCompanyJoinPopup
          open={openAddCompanyPopup}
          setOpen={setOpenAddCompanyPopup}
          companyData={data}
        />
      </>
    );
  };

  const CompanyJoinRequest = ({ data }: CompanyRequestProps) => {
    const {
      recruiterId,
      fullName,
      designation,
      phoneNo,
      linkedIn,
      location,
      profilePhoto,
      email,
      companyId,
    } = data || {};

    // console.log("compnay join request:", data);
    const {
      mutate: acceptCompanyJoin,
      isLoading: isAcceptingJoin,
      isError: isAcceptingJoinError,
    } = useAcceptJoinCompanyRequest(
      formSubmissionhandleSuccess,
      formSubmissionhandleError,
    );
    const {
      mutate: rejectCompanyJoin,
      isLoading: isRejectingJoin,
      isError: isRejectingJoinError,
    } = useRejectJoinCompanyRequest(
      formSubmissionhandleSuccess,
      formSubmissionhandleError,
    );

    // console.log("recruiter image:", profilePhoto)
    return (
      <>
        <Card className="w-full px-3.5 py-[13px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-0.5">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[2px] bg-[#00BA7033]">
                <UserPlus color="#00BA70" size={24} />
              </div>
              {/* details */}
              <h4 className="ml-[10px] text-base font-normal text-[#171717] ">
                <span className="font-bold">{data?.fullName}</span> has
                requested to join {""}
                <span className="font-bold">{companyId?.companyName}.</span>
              </h4>
              {/* popup open */}
              <p
                className="cursor-pointer text-base font-bold text-[#3790E3]"
                onClick={() => {
                  setOpenAddRecruiterPopup(true);
                }}
              >
                view details
              </p>
            </div>
            {/* button */}
            <div className="flex gap-2">
              {isAcceptingJoin && !isAcceptingJoinError ? (
                <AcceptColorButton title="Approving...">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </AcceptColorButton>
              ) : (
                <AcceptColorButton
                  title="Approve"
                  onClick={() => {
                    acceptCompanyJoin({
                      data: {
                        profilePhoto: {
                          originalName: profilePhoto?.originalName,
                          storageName: profilePhoto?.storageName,
                        },
                        email,
                        fullName,
                        designation,
                        phoneNo,
                        location,
                        linkedIn,
                      },
                      recruiterId,
                    });
                  }}
                />
              )}
              <Button
                disabled={isRejectingJoin}
                variant={"reject"}
                onClick={() => {
                  rejectCompanyJoin(recruiterId);
                }}
              >
                {isRejectingJoin && !isRejectingJoinError
                  ? "Rejecting..."
                  : "Reject"}
              </Button>
            </div>
          </div>
        </Card>
        <AddRecruiterRequest
          open={openAddRecruiterPopup}
          setOpen={setOpenAddRecruiterPopup}
          profilePhoto={profilePhoto}
          designation={designation}
          fullName={fullName}
          email={email}
          phoneNo={phoneNo}
          location={location}
          linkedIn={linkedIn}
          recruiterId={recruiterId}
        />
      </>
    );
  };

  const handleRenderDesign = (
    requestType: string,
    data: companyRequestPendingDataType,
  ) => {
    if (requestType === "createCompany") {
      return <CompanyCreateRequest data={data} />;
    } else {
      return <CompanyJoinRequest data={data} />;
    }
  };

  if (isPendingCompanyListLoading) {
    return (
      <DynamicHeightContainer>
        <div className="flex flex-col gap-2 pr-5">
          {[...Array(14)].map(() => (
            <Card className="w-full px-3.5 py-[13px]" key={crypto.randomUUID()}>
              <div className="flex justify-between">
                <div className="flex items-center gap-0.5">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[2px]">
                    <Skeleton className="h-[34px] w-[34px] rounded-sm" />
                  </div>
                  {/* details */}
                  <Skeleton className="h-6 w-32 md:w-[400px]" />
                  {/* popup open */}
                  <Skeleton className="h-6 w-10" />
                </div>
                {/* button */}
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-8 w-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DynamicHeightContainer>
    );
  }

  // console.log("pending Data List:", pendingCompanyList);
  return (
    <>
      <DynamicHeightContainer>
        <div className="flex flex-col gap-2 pr-5">
          {pendingCompanyList?.map((request: companyRequestPendingDataType) => {
            return <>{handleRenderDesign(request?.requestType, request)}</>;
          })}
          {pendingCompanyList?.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <p>No Pending Requests</p>
            </div>
          )}
        </div>
      </DynamicHeightContainer>
    </>
  );
};

export default CompanyPendingRequest;
