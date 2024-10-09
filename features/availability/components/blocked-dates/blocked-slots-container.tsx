import { Loader2 } from "lucide-react";
import useGetBlockedSlots from "../../api/get-blockedslots";
import BlockedSlots from "./blocked-slots";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const BlockedSlotsContainer = () => {
  const { data, isLoading, isError, error } = useGetBlockedSlots();
  const [parent] = useAutoAnimate();
  if (isError) console.log(error);
  console.log(data);
  return (
    <div ref={parent}>
      <h3 className="mb-6 mt-8 font-semibold text-brand-black">
        Blocked slots
      </h3>
      {isLoading ? (
        <Loader2 className="mx-auto mt-4 animate-spin" />
      ) : data?.length === 0 ? (
        <p>No blocked slots</p>
      ) : (
        data?.map((blockedSlot) => (
          <BlockedSlots key={blockedSlot._id} blockedSlot={blockedSlot} />
        ))
      )}
    </div>
  );
};

export default BlockedSlotsContainer;
