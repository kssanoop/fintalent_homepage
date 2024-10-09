import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import CandidateSidebar from "@/features/auth/candidate/login_image.jpg";
import RecruiterSidebar from "@/public/svg/recruitorLogin_sidebar.svg";
import CommonFinatlentSidebar from "@/public/fintalent_common_login_sidebar.png";
import { useRouter } from "next/router";
import LogoDark from "@/components/logo/brand-logo-dark";

const loginImages: Record<string, StaticImageData> = {
  "/candidate/": CandidateSidebar,
  "/recruiter/": RecruiterSidebar,
  "/admin/": CommonFinatlentSidebar,
  "/manager/": CommonFinatlentSidebar,
};

const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setCurrentPath(router.asPath);
    }
  }, [router.isReady]);

  let imageSource = CandidateSidebar; // default image to prevent src missing issue

  for (const path in loginImages) {
    if (currentPath.startsWith(path)) {
      imageSource = loginImages[path];
      break;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative hidden h-full w-[70%] max-w-[567px] lg:block">
        <Image
          className="object-cover"
          src={imageSource}
          fill
          alt="Login Image"
        />
      </div>
      <div
        id="form-scroll-container"
        className="flex w-full flex-col overflow-y-scroll px-5 md:p-8"
      >
        <LogoDark />
        <div className="flex flex-grow items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
