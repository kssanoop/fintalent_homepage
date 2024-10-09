import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil as EditIcon } from "lucide-react";
import { useState } from "react";
import { AvailabilityDialog } from "./availability-dialog";
import { format } from "date-fns";
import { AvailabilitySchema } from "../schema/availability-schema";
import { ROLES } from "@/types/authorization";
import _ from "lodash";
import useGetBlockedSlots from "../api/get-blockedslots";
interface AvailabilityCardProps {
  Interface: string;
  availabilityDetails: AvailabilitySchema;
}

const getAvailableDays = (availabilityDetails: AvailabilitySchema) => {
  return Object.keys(availabilityDetails.timeSlots).filter(
    // @ts-ignore
    (day) => availabilityDetails.timeSlots[day].available,
  );
};

const AvailabilityCard = ({
  availabilityDetails,
  Interface,
}: AvailabilityCardProps) => {
  const [openAvailabilityDialog, setOpenAvailabilityDialog] = useState(false);

  const { data: blockedSlots } = useGetBlockedSlots();

  const availableDays = getAvailableDays(availabilityDetails);

  const availabilityInfo = [
    {
      name: "Available from",
      value: format(new Date(availabilityDetails.availableFrom), "dd MMM yyyy"),
    },
    {
      name: "Available days",
      value: availableDays
        .map((day) => _.upperFirst(day.slice(0, 3)))
        .join(", "),
    },
    {
      name: "Blocked slots",
      value: blockedSlots?.length ?? 0,
    },
  ];

  const handleAvailabilityDialogClick = () => {
    setOpenAvailabilityDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xs tracking-[1.92px] text-[#171717]">
              AVAILABILITY
            </CardTitle>
            {Interface === ROLES.CANDIDATE && (
              <EditIcon
                onClick={handleAvailabilityDialogClick}
                fill="#A9A9A9"
                color="white"
                size={16}
                className="cursor-pointer"
              />
            )}
          </div>
          {Interface === ROLES.CANDIDATE && (
            <p
              onClick={handleAvailabilityDialogClick}
              className="cursor-pointer text-[#3790E3]"
            >
              View in detail
            </p>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 px-5 pb-4 md:grid-cols-3">
          {availabilityInfo.map(({ name, value }) => (
            <div key={crypto.randomUUID()} className="text-sm">
              <h6 className="mb-2 text-[#5E5E5E]">{name}</h6>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <AvailabilityDialog
        open={openAvailabilityDialog}
        setOpen={setOpenAvailabilityDialog}
      />
    </>
  );
};

export default AvailabilityCard;
