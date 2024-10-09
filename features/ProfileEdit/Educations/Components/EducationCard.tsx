import React, { useState } from "react";
import { Pencil as EditIcon, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EducationDialog from "./EducationDialoge";
import { EducationDetails } from "../Schema/EducationSchema";
import DeletePopup from "../../common/DeletePopup";
import { ROLES } from "@/types/authorization";

interface EducationCardProps {
  educationDetails: EducationDetails;
  Interface: string;
}
const EducationCard = ({ educationDetails, Interface }: EducationCardProps) => {
  const [openEducationDialog, setOpenEducationDialog] = useState(false);
  const [openEducationDeleteDialog, setOpenEducationDeleteDialog] =
    useState(false);
  const [isEdit, setEdit] = useState(false);
  const [clickedDeleteIndex, setClickedDeleteIndex] = useState<
    undefined | number
  >(undefined);
  const [clickedEditIndex, setClickedEditIndex] = useState(0);

  const handleEducationEditClick = (id: number) => {
    setOpenEducationDialog(true);
    setEdit(true);
    setClickedEditIndex(id);
  };

  const handleEducationDeleteClick = (id: number) => {
    setOpenEducationDeleteDialog(true);
    setClickedDeleteIndex(id);
  };

  const handleAddEducationDialogClick = () => {
    setOpenEducationDialog(true);
    setEdit(false);
  };

  const getDateRange = (
    startDate: string,
    endDate: string,
    currentlyStudyingHere: boolean,
  ) => {
    const JobstartDate = new Date(startDate);
    const JobendDate = new Date(endDate);
    const startMonth = JobstartDate.toLocaleString("default", {
      month: "long",
    });
    const endMonth = JobendDate.toLocaleString("default", { month: "long" });
    const startYear = JobstartDate.getFullYear();
    const endYear = JobendDate.getFullYear();

    return `${startMonth} ${startYear} - ${
      currentlyStudyingHere ? "present" : `${endMonth} ${endYear}`
    } `;
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          {/* <div className="flex items-center gap-2"> */}
          <CardTitle className="text-xs font-semibold tracking-[1.92px] text-[#171717]">
            EDUCATIONAL QUALIFICATION
          </CardTitle>
          {/* </div> */}
          {Interface === ROLES.CANDIDATE && (
            <p
              className="cursor-pointer text-[#3790E3]"
              onClick={handleAddEducationDialogClick}
            >
              Add new +
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            {educationDetails.map((education: any, index: number) => {
              return (
                <div className="flex flex-col gap-3" key={index}>
                  {/* details with edit/del */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-base font-medium text-black">
                        <h3>{education?.instituteName}</h3>
                        {/* edit / del icons */}
                        {Interface === ROLES.CANDIDATE && (
                          <div className="flex gap-2">
                            <EditIcon
                              fill="#A9A9A9"
                              color="white"
                              size={16}
                              className="cursor-pointer"
                              onClick={() => {
                                handleEducationEditClick(index);
                              }}
                            />
                            <Trash
                              color="#A9A9A9"
                              size={16}
                              className="cursor-pointer"
                              onClick={() => {
                                handleEducationDeleteClick(index);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {/* working at */}
                      <p className="text-sm font-normal text-black">
                        {education?.courseName}
                      </p>
                    </div>
                    {/* date and location */}
                    <div className="flex justify-between gap-5">
                      <h3 className="text-sm font-normal text-[#777777]">
                        {getDateRange(
                          education?.startDate,
                          education?.endDate,
                          education?.currentlyStudyingHere,
                        )}{" "}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <EducationDialog
        open={openEducationDialog}
        setOpen={setOpenEducationDialog}
        educationDetails={educationDetails}
        isEdit={isEdit}
        clickedIndex={clickedEditIndex}
      />
      <DeletePopup
        open={openEducationDeleteDialog}
        setOpen={setOpenEducationDeleteDialog}
        clickedDeleteIndex={clickedDeleteIndex}
        data={educationDetails}
        section={"educationHistory"}
      />
    </>
  );
};

export default EducationCard;
