import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Accpetjobquestion from "./accpetjobquestion";
import RejectJobPopup from "./rejectJobPopup";
import { AcceptJobQuestionSheet } from "./acceptJobQuestionSheet";
import AcceptofferPopup from "./acceptOfferpopup";
import AcceptInvitePopup from "./accpetInvitePopup";
import RejectJobOfferPopup from "./rejectJobOffer";

interface Props {
  section?: string;
  selectedTab?: string;
  data: any;
}

const JobCardFooter = ({ section, selectedTab, data }: Props) => {
  const [openQuestionPopup, setOpenQuestionPopup] = useState(false);
  const [openQuestionSheetPopup, setOpenQuestionSheetPopup] = useState(false);
  const [acceptInvitePopup, setAcceptInvitePopup] = useState(false);
  const [rejectInvitePopup, setRejectInvitePopup] = useState(false);
  const [acceptOfferPopup, setAcceptOfferPopup] = useState(false);
  const [rejectOfferPopup, setRejectOfferPopup] = useState(false);
  // const { jobId } = data;
  const handlePopupOpen = (buttonClicked: string) => {
    if (data?.questionsAndAnswers?.length > 0 && buttonClicked === "invite") {
      if (window.innerWidth > 767) {
        setOpenQuestionPopup(true);
      } else {
        setOpenQuestionSheetPopup(true);
      }
    } else if (buttonClicked === "invite") {
      setAcceptInvitePopup(true);
    } else if (buttonClicked === "offer") {
      setAcceptOfferPopup(true);
    }
  };

  console.log("Card Footer Data:", data);
  const { jobId, companyId } = data || {};

  return (
    <>
      {section !== "JobsTabs" ? (
        <div className="mt-1 flex justify-end gap-2 md:mt-1">
          {/* reject button with popup */}
          <Button
            className="border border-border bg-[#FFEDED] text-sm font-bold text-[#E72F2F] hover:text-[#E72F2F] "
            variant={"outline"}
            onClick={() => {
              setRejectInvitePopup(true);
            }}
          >
            Decline
          </Button>
          {/* accept button with popup */}
          <Button
            className="border border-border text-sm font-bold"
            variant={"success"}
            onClick={() => {
              handlePopupOpen("invite");
            }}
          >
            Accept
          </Button>
        </div>
      ) : section === "JobsTabs" &&
        selectedTab === "offered" &&
        jobId?.jobStatus === "open" &&
        data.approvalChecks.candidate === "pending" ? (
        <div className="flex justify-end gap-2">
          {/* reject  */}
          <Button
            className="border border-border bg-[#FFEDED] text-sm font-bold text-[#E72F2F] hover:text-[#E72F2F] "
            variant={"outline"}
            onClick={() => {
              setRejectOfferPopup(true);
            }}
          >
            Decline
          </Button>
          {/* accept */}
          <Button
            className="border border-border text-sm font-bold"
            variant={"success"}
            onClick={() => {
              handlePopupOpen("offer");
            }}
          >
            Accept offer
          </Button>
        </div>
      ) : (
        jobId?.jobStatus !== "open" && (
          <div className="border border-solid border-[#CDCDCD] px-5 py-2 text-center text-sm font-bold text-[#5E5E5E]">
            Job Closed
          </div>
        )
      )}
      <Accpetjobquestion
        open={openQuestionPopup}
        setOpen={setOpenQuestionPopup}
        questions={data?.questionsAndAnswers}
        jobId={data?._id}
      />

      <AcceptJobQuestionSheet
        setOpen={setOpenQuestionSheetPopup}
        questions={data?.questionsAndAnswers}
        jobId={data?._id}
        open={openQuestionSheetPopup}
      />

      <AcceptofferPopup
        open={acceptOfferPopup}
        setOpen={setAcceptOfferPopup}
        jobId={data?._id}
        companyName={companyId?.companyName}
        jobTitle={jobId?.jobTitle}
      />
      <RejectJobOfferPopup
        open={rejectOfferPopup}
        setOpen={setRejectOfferPopup}
        jobId={data?._id}
        companyName={companyId?.companyName}
        jobTitle={jobId?.jobTitle}
      />
      <AcceptInvitePopup
        open={acceptInvitePopup}
        setOpen={setAcceptInvitePopup}
        jobId={data?._id}
      />
      <RejectJobPopup
        open={rejectInvitePopup}
        setOpen={setRejectInvitePopup}
        jobId={data?._id}
      />
    </>
  );
};

export default JobCardFooter;
