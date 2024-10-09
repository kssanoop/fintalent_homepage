import Image from "next/image";

import VerifiedIcon from "public/svg/verified.svg";

interface VerifiedProps {
  isVerified: boolean;
}

const Verified = ({ isVerified }: VerifiedProps) => {
  return (
    <>
      {isVerified ? (
        <Image
          src={VerifiedIcon}
          width={24}
          height={24}
          alt="verified-icon"
          className="h-auto w-auto"
        />
      ) : null}
    </>
  );
};

export default Verified;
