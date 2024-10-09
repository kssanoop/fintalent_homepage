import BrandDark from "@/public/logoDark.svg"
import Image from "next/image";
import Link from "next/link";

const LogoDark = () => {
  return (
    <Link href={"/"} className="focus:outline-none">
      <Image src={BrandDark} alt="Brand Logo Dark" width={65} height={65} />
    </Link>
  );
};

export default LogoDark;
