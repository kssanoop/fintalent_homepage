import Lottie from "lottie-react";
import NotFoundAnimation from "@/utils/lottie/404.json";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Lottie animationData={NotFoundAnimation} loop={true} />
      <h3>The page you have requested is not found</h3>
      <Link href={"/"} className="font-bold underline">
        Go back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
