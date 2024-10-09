import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil as EditIcon } from "lucide-react";
import React, { useState } from "react";
import JobPreferenceDialog from "./JobPreferenceDialog";
import { ROLES } from "@/types/authorization";
import { NOTICE_PERIOD } from "@/features/auth/candidate/login/components/basic-details";
import _ from "lodash";
import { preferredShiftOptions } from "./JobPereferenceEditForm";

interface JobPreferenceCardProps {
  jobPreference: {
    currentCTC: number;
    employmentType: string[];
    expectedCTC: number;
    location: string[];
    noticePeriod: string;
    shift: string[];
    employmentMode: string[];
  };
  Interface: string;
}

const DATA_EMPTY_MSG = "Not Provided";

const JobPreferenceCard = ({
  jobPreference,
  Interface,
}: JobPreferenceCardProps) => {
  const [openJobPreferenceDialog, setOpenJobPreferenceDialog] = useState(false);
  const {
    currentCTC,
    employmentType,
    expectedCTC,
    location,
    noticePeriod,
    shift,
    employmentMode,
  } = jobPreference;
  const TitlesList = [
    {
      name: "Preferred location",
      value: location.join(", "),
    },
    {
      name: "Expected CTC",
      value: `${expectedCTC} LPA`,
    },
    {
      name: "Current CTC",
      value: `${currentCTC} LPA`,
    },
    {
      name: "Preferred shift",
      value: preferredShiftOptions
        .filter((option) => shift.includes(option.value))
        .map((option) => option.label)
        .join(", "),
    },
    {
      name: "Notice period",
      value: `${
        NOTICE_PERIOD.find((period) => period.value === noticePeriod)?.label
      }`,
    },
    {
      name: "Employment Type",
      value: employmentType.map((type) => _.startCase(type)).join(", "),
    },
    {
      name: "on site/remote",
      value: employmentMode.map((mode) => _.startCase(mode)).join(", "),
    },
  ];

  const handleJobPreferenceClick = () => {
    setOpenJobPreferenceDialog(true);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xs font-semibold tracking-[1.92px] text-[#171717]">
              JOB PREFERENCES
            </CardTitle>
            {Interface === ROLES.CANDIDATE && (
              <EditIcon
                fill="#A9A9A9"
                color="white"
                size={16}
                className="cursor-pointer"
                onClick={handleJobPreferenceClick}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {TitlesList?.map((title) => {
              return (
                <div className="flex flex-col gap-2" key={crypto.randomUUID()}>
                  <h3 className="text-sm font-normal text-[#5E5E5E]">
                    {title?.name}
                  </h3>
                  <p className="text-sm font-medium capitalize text-black">
                    {title?.value || DATA_EMPTY_MSG}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <JobPreferenceDialog
        open={openJobPreferenceDialog}
        setOpen={setOpenJobPreferenceDialog}
        jobPreference={jobPreference}
      />
    </>
  );
};

export default JobPreferenceCard;
