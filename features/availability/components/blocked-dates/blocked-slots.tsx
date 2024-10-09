import { format, parseISO } from "date-fns";
import { BlockedSlot } from "../../schema/blocked-slots-schema";
import { formatToTwelveHrs } from "@/utils/format-date";
import { Trash } from "lucide-react";
import useDeleteBlockedSlot from "../../api/delete-blockedslot";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  blockedSlot: BlockedSlot;
}

const BlockedSlots = ({ blockedSlot }: Props) => {
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
  };

  const { mutate } = useDeleteBlockedSlot(handleSuccess, handleError);
  console.log(blockedSlot);
  console.log(
    new Date(
      new Date(blockedSlot.startDateTime).setMinutes(
        new Date(blockedSlot.startDateTime).getMinutes() + 30,
      ),
    ),
    new Date(blockedSlot.startDateTime),
  );
  const handleDelete = (id: string) => {
    mutate(id);
  };
  return (
    <div className="mb-4 flex justify-between text-[#5E5E5E]">
      <p className="font-semibold">
        {format(parseISO(blockedSlot.startDateTime), "eeee dd MMM, yyyy")}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex">
          <p>{formatToTwelveHrs(new Date(blockedSlot.startDateTime))}</p>
          &nbsp;-&nbsp;
          <p>
            {formatToTwelveHrs(
              new Date(
                new Date(blockedSlot.startDateTime).setMinutes(
                  new Date(blockedSlot.startDateTime).getMinutes() + 30,
                ),
              ),
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            handleDelete(blockedSlot._id);
          }}
        >
          <Trash color="#5E5E5E" />
        </button>
      </div>
    </div>
  );
};

export default BlockedSlots;
