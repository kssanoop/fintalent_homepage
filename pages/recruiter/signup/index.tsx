import LoginLayout from "@/components/layout/login-layout";
import SignUpForm from "@/features/auth/common/signup-form";
import React, { ReactElement } from "react";

const SignUp = () => {
  return <SignUpForm role="recruiter" />;
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignUp;
