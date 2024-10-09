import Image from "next/image";
import BellIcon from "public/bell.svg";

const Bell = () => {
  return (
    <Image
      src={BellIcon}
      width={24}
      height={24}
      alt="notification-icon"
      className="h-auto w-auto"
    />
  );
};

export default Bell;
