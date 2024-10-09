import { useEffect, type ReactElement, useState } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import storage from "@/utils/storage";
import { useGetAuthInfo } from "@/features/auth/api/get-auth-info";

const PendingVerification: NextPageWithLayout = () => {
  const [email, setEmail] = useState("");

  const { data: userInfo } = useGetAuthInfo();
  console.log(userInfo);
  if (userInfo) {
    const cookie = storage.getDatafromCookie("user_data");
    const modifiedCookie = {
      ...cookie,
      userDetails: {
        ...cookie.userDetails,
        accountVerifiedStatus: userInfo.userDetails.accountVerifiedStatus,
      },
    };
    storage.setCookieData("user_data", JSON.stringify(modifiedCookie));
  }
  useEffect(() => {
    const { auth } = storage.getDatafromCookie("user_data");
    setEmail(auth.email);
  }, []);

  return (
    <div className="flex flex-col gap-y-10 text-center">
      <h1 className="text-2xl font-semibold">
        Thank you! <br /> Kindly wait until our team verifies your profile.
      </h1>
      <p className="font-medium text-[#5E5E5E]">
        We will send a confirmation at {email} once you are verified,.
      </p>
      <Link
        onClick={() => {
          storage.clearCookies("user_data");
        }}
        className="font-medium text-link"
        href={"/"}
      >
        Go to Home
      </Link>
    </div>
  );
};

PendingVerification.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default PendingVerification;
