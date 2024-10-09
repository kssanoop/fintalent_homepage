import Bell from "@/components/bell";
import PrimaryLayout from "@/components/layout/primary-layout";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import ResetPasswordForm from "@/features/ProfileEdit/reset-password/reset-password-form";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const ResetPassword = () => {
  const router = useRouter();
  return (
    <div className="container-width flex h-full w-full flex-col bg-white md:bg-[#F7F7F7]">
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex h-16 items-center justify-between bg-white px-5">
        <div className="flex items-center gap-2">
          <ChevronLeft
            color="#5E5E5E"
            size={20}
            strokeWidth={2.5}
            className="hidden cursor-pointer md:block"
            onClick={() => {
              router.push("/candidate/profile");
            }}
          />
          <h1 className="text-xl font-bold text-[#171717] md:text-2xl">
            Change password
          </h1>
        </div>
        <Bell />
      </div>
      <div className="w-full max-w-[462px] md:w-[462px]">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function getLayout(Page: ReactElement) {
  return <PrimaryLayout>{Page}</PrimaryLayout>;
};
