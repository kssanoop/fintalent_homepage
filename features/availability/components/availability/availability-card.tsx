import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil as EditIcon } from "lucide-react";
import { useState } from "react";
import { AvailabilityDialog } from "../availability-dialog";
const AvailabilityCard = () => {
  const [openAvailabilityDialog, setOpenAvailabilityDialog] = useState(false);
  const availabilityInfo = [
    {
      name: "Available from",
      value: "21 May 2023",
    },
    {
      name: "Available days",
      value: "Mon, Tue, Wed, Thursday, Fri.",
    },
    {
      name: "Blocked slots",
      value: "2",
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
            <EditIcon
              onClick={handleAvailabilityDialogClick}
              fill="#A9A9A9"
              color="white"
              size={16}
              className="cursor-pointer"
            />
          </div>
          <p
            onClick={handleAvailabilityDialogClick}
            className="cursor-pointer text-[#3790E3]"
          >
            View in detail
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 px-5 pb-4 md:grid-cols-3">
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
