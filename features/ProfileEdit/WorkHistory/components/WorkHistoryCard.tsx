import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Pencil as EditIcon, Trash } from "lucide-react";
import WorkHistoryDialog from "./WorkHistoryDialog";
import DeletePopup from "../../common/DeletePopup";
import { EmploymentDetails } from "../Schema/WorkHistorySchema";
import { ROLES } from "@/types/authorization";

interface WorkHistoryCardProps {
  employmentDetails: EmploymentDetails;
  Interface: string;
}
const WorkHistoryCard = ({
  employmentDetails,
  Interface,
}: WorkHistoryCardProps) => {
  const [openWorkHistoryDialog, setOpenWorkHistoryDialog] = useState(false);
  const [openWorkHistoryDeleteDialog, setOpenWorkHistoryDeleteDialog] =
    useState(false);
  const [showFullDescription, setShowFullDescription] = useState(
    employmentDetails.map(() => false),
  );
  const [isEdit, setEdit] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [clickedDeleteIndex, setClickedDeleteIndex] = useState<
    undefined | number
  >(undefined);
  // const { companyName, employmentType, jobLocation, startDate, endDate } =
  //   employmentDetails;
  const handleWorkHistoryEditClick = (id: number) => {
    setOpenWorkHistoryDialog(true);
    setEdit(true);
    setClickedIndex(id);
  };

  const handleWorkHistoryAddClick = () => {
    setOpenWorkHistoryDialog(true);
    setEdit(false);
  };

  const handleWorkHistoryDeleteClick = (id: number) => {
    setOpenWorkHistoryDeleteDialog(true);
    setClickedDeleteIndex(id);
  };

  const getExperience = (
    startDate: string,
    endDate: string,
    currentlyWorkingHere: boolean,
  ) => {
    const start = new Date(startDate);
    const end = currentlyWorkingHere ? new Date() : new Date(endDate);

    const diff = new Date(end).getTime() - new Date(start).getTime();
    const totalMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

    const yearDiff = Math.floor(totalMonths / 12);
    const monthDiff = totalMonths % 12;
    // const yearDiff = end?.getFullYear() - start?.getFullYear();
    // const monthDiff = end?.getMonth() - start?.getMonth() + yearDiff * 12;

    if (yearDiff === 0) {
      if (monthDiff === 0) {
        return "1 mos";
      } else {
        return `${monthDiff} mos`;
      }
    } else {
      return `${yearDiff} yr${yearDiff === 1 ? "" : "s"} ${
        monthDiff === 0 ? monthDiff + " mos" : ""
      }`;
    }
  };

  const getDateRange = (
    startDate: string,
    endDate: string,
    currentlyWorkingHere: boolean,
  ) => {
    const JobstartDate = new Date(startDate);
    const JobendDate = new Date(endDate);
    const startMonth = JobstartDate.toLocaleString("default", {
      month: "long",
    });
    const endMonth = JobendDate?.toLocaleString("default", { month: "long" });
    const startYear = JobstartDate?.getFullYear();
    const endYear = JobendDate?.getFullYear();

    return `${startMonth} ${startYear} - ${
      currentlyWorkingHere ? "present" : `${endMonth} ${endYear}`
    } `;
  };

  const Truncate = (description: string, length: number) => {
    // Check if the window object is defined
    const Desclength =
      typeof window !== "undefined" && window.innerWidth <= 768 ? 70 : length;

    return description.length > Desclength
      ? description.substring(0, Desclength) + "..."
      : description;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          {/* <div className="flex items-center gap-2"> */}
          <CardTitle className="text-xs tracking-[1.92px] text-[#171717]">
            WORK HISTORY
          </CardTitle>
          {/* </div> */}
          {Interface === ROLES.CANDIDATE && (
            <p
              className="cursor-pointer text-[#3790E3]"
              onClick={handleWorkHistoryAddClick}
            >
              Add new +
            </p>
          )}
        </CardHeader>
        <CardContent>
          {/* details with edit/del */}
          <div className="flex flex-col gap-5">
            {employmentDetails?.map((job: any, id: any) => {
              return (
                <div className="flex flex-col gap-3" key={id}>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex gap-1 text-base font-medium text-black">
                        <h3>
                          {job?.jobTitle ? job?.jobTitle : "Not specified"}
                        </h3>
                        <span className="font-normal">
                          .{" "}
                          {getExperience(
                            job?.startDate,
                            job?.endDate,
                            job?.currentlyWorkingHere,
                          )}
                        </span>
                      </div>
                      {/* working at */}
                      <p className="text-sm font-normal text-black">
                        at {job?.companyName}
                      </p>
                    </div>
                    {/* date and location */}
                    <div className="flex justify-between gap-5">
                      <h3 className="text-sm font-normal text-[#5E5E5E]">
                        {getDateRange(
                          job?.startDate,
                          job?.endDate,
                          job?.currentlyWorkingHere,
                        )}{" "}
                        .{" "}
                        {job?.employmentType?.replace(/^\w/, (c: any) =>
                          c.toUpperCase(),
                        )}{" "}
                        .{" "}
                        {job?.jobLocation?.replace(/^\w/, (c: any) =>
                          c.toUpperCase(),
                        )}
                      </h3>
                      {/* edit / del icons */}
                      {Interface === ROLES.CANDIDATE && (
                        <div className="flex gap-2">
                          <EditIcon
                            fill="#A9A9A9"
                            color="white"
                            size={16}
                            className="cursor-pointer"
                            onClick={() => {
                              handleWorkHistoryEditClick(id);
                            }}
                          />
                          <Trash
                            color="#A9A9A9"
                            size={16}
                            className="cursor-pointer"
                            onClick={() => {
                              handleWorkHistoryDeleteClick(id);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* description */}
                  <p
                    className={`${
                      showFullDescription[id]
                        ? "line-clamp-none"
                        : "line-clamp-2"
                    }  overflow-ellipsis text-sm font-normal text-black`}
                  >
                    {showFullDescription[id]
                      ? job?.summary
                      : Truncate(job?.summary, 170)}
                    <span
                      className="cursor-pointer font-bold text-[#5E5E5E]"
                      onClick={() => {
                        const updatedShowFullDescription = [
                          ...showFullDescription,
                        ];
                        updatedShowFullDescription[id] =
                          !updatedShowFullDescription[id];
                        setShowFullDescription(updatedShowFullDescription);
                        setClickedIndex(id);
                      }}
                    >
                      {" "}
                      {job?.summary?.length > 170 && (
                        <>
                          {" "}
                          {showFullDescription[id] ? "Read less" : "Read more"}
                        </>
                      )}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <WorkHistoryDialog
        open={openWorkHistoryDialog}
        setOpen={setOpenWorkHistoryDialog}
        employmentDetails={employmentDetails}
        isEdit={isEdit}
        clickedIndex={clickedIndex}
      />
      <DeletePopup
        open={openWorkHistoryDeleteDialog}
        setOpen={setOpenWorkHistoryDeleteDialog}
        clickedDeleteIndex={clickedDeleteIndex}
        data={employmentDetails}
        section={"workHistory"}
      />
    </>
  );
};

export default WorkHistoryCard;
