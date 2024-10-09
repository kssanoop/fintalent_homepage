import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Briefcase } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import { truncate } from "lodash";
import Link from "next/link";

interface InviteAcceptedResponseProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
}
const InviteAcceptedResponse = ({
  isOpen,
  setOpen,
  data,
}: InviteAcceptedResponseProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="p-5">
        {data?.map((candidate: any) => (
          <div key={crypto.randomUUID()} className="px-1">
            <div className="flex flex-col gap-4 break-all">
              {/* first col */}
              <div className="flex items-start gap-1.5">
                {/* image */}
                <CandidateCardAvatar
                  className="h-[62px] w-[62px]"
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
                />
                {/* user details */}
                <div className="flex max-w-[350px] flex-col items-start gap-1">
                  {/* Name */}
                  <h3 className="text-base font-bold text-[#171717]">
                    {truncate(candidate?.candidate?.fullName, { length: 25 })}
                  </h3>

                  <div className="flex items-center gap-0.5 text-xs font-medium text-[#000]">
                    {/* skill */}{" "}
                    <p className="mr-0.5">
                      {" "}
                      {truncate(candidate?.candidate?.jobTitle, { length: 25 })}
                    </p>
                  </div>
                  {/* company and experience */}
                  <div className="flex items-center gap-[5px] text-xs font-medium text-[#5E5E5E]">
                    <p>
                      currently at{" "}
                      {truncate(candidate?.candidate?.currentOrganization, {
                        length: 10,
                      })}
                    </p>
                    <div className="h-3.5 w-[1px] rounded-xl bg-[#5E5E5E]" />

                    <div className="flex items-center gap-1">
                      <Briefcase size={12} />
                      <p>
                        {candidate?.candidate?.totalExperience?.year} Years and{" "}
                        {""}
                        {candidate?.candidate?.totalExperience?.month}{" "}
                        {candidate?.candidate?.totalExperience?.month > 1
                          ? "months"
                          : "month"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* second-col */}
              <div className="flex h-[1px] w-full rounded-xl bg-[#CDCDCD]" />
              {/* Third-col */}
              <div className="scroll-container flex h-[200px] flex-col gap-6 overflow-auto md:h-[300px]">
                {candidate?.questionsAndAnswers?.map(
                  (response: {
                    answer: string;
                    question: string;
                    file: { originalName: string; storageName: string };
                  }) => (
                    <div
                      className="flex flex-col gap-2 text-sm"
                      key={crypto.randomUUID()}
                    >
                      <h4 className="font-semibold leading-5 text-[#171717]">
                        {response?.question}
                      </h4>
                      <p className="font-normal text-[#5E5E5E]">
                        {response?.answer}
                      </p>

                      {response?.file?.storageName && (
                        <Link
                          href={`${process.env.NEXT_PUBLIC_IMG_URL}${response?.file?.storageName}`}
                          target="_blank"
                          className="flex  items-center gap-2.5 self-start rounded  bg-[#EFEFEF] px-2 py-1 text-brand-grey hover:underline"
                        >
                          <span className="line-clamp-1">
                            {response?.file?.originalName}{" "}
                          </span>
                          <div className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="11"
                              fill="none"
                              viewBox="0 0 12 11"
                            >
                              <path
                                stroke="#034A9A"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.167"
                                d="M4.833.833H2.5A1.167 1.167 0 001.333 2v7A1.167 1.167 0 002.5 10.167h7A1.167 1.167 0 0010.667 9V6.667M6 5.5L10.667.833m0 0V3.75m0-2.917H7.75"
                              ></path>
                            </svg>
                          </div>
                        </Link>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default InviteAcceptedResponse;
