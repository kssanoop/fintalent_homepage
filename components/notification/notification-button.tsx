import Link from "next/link";
import Bell from "../bell";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";
import useGetNotificationsCount from "@/features/notification/api/get-notifications-count";

const hasExceededTensPlace = (number: number) => {
  const numStr = number.toString();
  if (numStr.length > 2) {
    const tensDigit = parseInt(numStr[numStr.length - 3]);
    console.log(tensDigit);
    if (tensDigit > 0) {
      return true;
    }
  }

  return false;
};

const NotificationButton = () => {
  const { role } = useGetInfoFromCookie();
  const { data, isLoading } = useGetNotificationsCount();
  return (
    <Link href={`/${role}/notifications`} className="relative">
      <Bell />
      {!isLoading && data && (
        <div
          className={`absolute ${
            data.totalCount === 0 && "hidden"
          } -right-1 -top-1 h-4 w-4 rounded-full bg-brand-blue-light text-center text-[10px] text-white`}
        >
          <p>{hasExceededTensPlace(data.totalCount) ? "!" : data.totalCount}</p>
        </div>
      )}
    </Link>
  );
};

export default NotificationButton;
