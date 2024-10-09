import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Pencil as EditIcon } from "lucide-react";
import { PersonalDetail } from "../Schema/PersonalSchema";
import PersonalDetailsDialog from "./PersonalDetailsDialog";
import { ROLES } from "@/types/authorization";

interface PersonalDetailsCardProps {
  personalDetails: PersonalDetail;
  Interface: string;
}

const PersonalDetailsCard = ({
  personalDetails,
  Interface,
}: PersonalDetailsCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reduce Redundancy
  const PersonalDataFunc = (name: string, value: string) => {
    return (
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-normal text-[#5E5E5E]">{name}</h4>
        <p className="text-sm font-medium">{value}</p>
      </div>
    );
  };

  // formatted DOB
  const formattedDate = (date: string) => {
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  };

  // handle Dialog Open
  const handleEditDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xs tracking-[1.92px] text-[#171717]">
              PERSONAL DETAILS
            </CardTitle>
            {Interface === ROLES?.CANDIDATE && (
              <EditIcon
                fill="#A9A9A9"
                color="white"
                size={16}
                className="cursor-pointer"
                onClick={handleEditDialogOpen}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
              {PersonalDataFunc(
                "Gender",
                personalDetails?.gender?.replace(/^\w/, (c) => c.toUpperCase()),
              )}
              {PersonalDataFunc("DOB", formattedDate(personalDetails?.dob))}
              {PersonalDataFunc("State", personalDetails?.state)}
              {PersonalDataFunc("Country", personalDetails?.country)}
              {PersonalDataFunc(
                "City",
                personalDetails?.city.replace(/^\w/, (c) => c.toUpperCase()),
              )}
              {PersonalDataFunc("PIN code", personalDetails?.pincode)}
            </div>
            {/* address */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-normal text-[#5E5E5E]">Address</h4>
              <p className="text-sm font-medium">
                {personalDetails?.addressLine1?.replace(/^\w/, (c) =>
                  c.toUpperCase(),
                )}
              </p>
              <p className="text-sm font-medium">
                {personalDetails?.addressLine2?.replace(/^\w/, (c) =>
                  c.toUpperCase(),
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <PersonalDetailsDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        personalDetails={personalDetails}
      />
    </>
  );
};

export default PersonalDetailsCard;
