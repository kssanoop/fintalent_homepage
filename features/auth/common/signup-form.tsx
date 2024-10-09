import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { type loginSignUpSchema } from "@/features/auth/schema/auth-schema";
import { toast } from "sonner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Eye, Loader2, ShieldX } from "lucide-react";
import CloseEye from "@/features/auth/candidate/eye_close.svg";
import { useLoginSignUp } from "@/features/auth/api/login-signup";
import { useRouter } from "next/router";
import handleRedirection from "@/features/auth/util/route-util";
import { RoleTypes } from "@/types/authorization";

const SignUpForm = ({ role }: { role: RoleTypes }) => {
  type handleRedirectionProps =
    | {
        role: "candidate";
        profileVerified: boolean;
        accountVerifiedStatus: string;
        docStatus: string;
      }
    | {
        role: "recruiter";
        accountVerifiedStatus: string;
        docStatus: string;
      };

  const router = useRouter();
  const form = useForm<loginSignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role,
    },
    reValidateMode: "onChange",
  });

  const password = form.watch("password");
  const [meter, setMeter] = React.useState(false);
  const [parent] = useAutoAnimate();

  // const passwordRegex =
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?/~`!]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value,
  ).length;

  const handleSuccess = async (data: any) => {
    console.log("response:", data);
    toast.success(data.message);

    const response = data.data?.userDetails as handleRedirectionProps;

    if (response.docStatus === "active") {
      await handleRedirection(response, router);
    } else {
      await router.push("/account-inactive");
    }
    // if (candidatestatus === "active") {
    //   await handleRedirection(
    //     "candidate",
    //     profileVerified,
    //     accountVerifiedStatus,
    //     router,
    //   );
    // }
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.message);
  };

  const { mutate, isLoading } = useLoginSignUp(handleSuccess, handleError);

  const onSubmit = async (values: loginSignUpSchema) => {
    // deleting the confirmPassword from request
    const { confirmPassword, ...submitData } = values;
    submitData.action = "signup";
    mutate(submitData);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass((prevState) => !prevState);
  };

  return (
    <Card className="w-[462px] border-0 bg-background shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-extrabold md:text-[32px] mb-1">
          Get Started
        </CardTitle>
        {/* <CardDescription className="text-base">
          Ut blandit dolor tristique aliquam non ac tincidunt.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: { value: true, message: "Email ID cannot be blank" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid Email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: joe@gmail.com"
                      className={`${form.formState.errors.email && "shake"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: { value: true, message: "Password cannot be blank" },
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or more",
                },
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?/~`!]).{8,}$/,
                  message: "Password does not meet the minimum requirements",
                },
              }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        onFocus={() => {
                          setMeter(true);
                        }}
                        className={`font-medium ${
                          showPassword ? "" : "text-xl"
                        } tracking-wider ${
                          form.formState.errors.password && "shake"
                        }`}
                        type={showPassword ? "text" : "password"}
                        placeholder="*****"
                        {...field}
                      />
                      <div
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                        className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-inherit pl-1"
                      >
                        {showPassword ? (
                          <Eye size={24} strokeWidth={2} color="#5E5E5E" />
                        ) : (
                          <Image
                            src={CloseEye}
                            width={24}
                            height={24}
                            alt="Closed eye icon"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4" ref={parent}>
              {meter && (
                <>
                  {passwordStrength < 3}
                  {passwordTracker.eightCharsOrGreater ? (
                    <div className="inline-flex items-center gap-x-1.5">
                      <Check color="#29A327" width={14} height={14} />
                      <p>Need ateast 8 characters</p>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-x-1.5">
                      <ShieldX color="#CA3433" width={16} height={16} />
                      <p>Need ateast 8 characters</p>
                    </div>
                  )}
                  {passwordTracker.number ? (
                    <div className="inline-flex items-center gap-x-1.5">
                      <Check color="#29A327" width={14} height={14} />
                      <p>Include atleast one number (0-9)</p>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-x-1.5">
                      <ShieldX color="#CA3433" width={16} height={16} />
                      <p>Include atleast one number (0-9)</p>
                    </div>
                  )}
                  {passwordTracker.specialChar ? (
                    <div className="inline-flex items-center gap-x-1.5">
                      <Check color="#29A327" width={14} height={14} />
                      <p>Include atleast one symbol</p>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-x-1.5">
                      <ShieldX color="#CA3433" width={16} height={16} />
                      <p>Include atleast one symbol</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                validate: (value) =>
                  value === form.watch("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className={`font-medium ${
                          showConfirmPass ? "" : "text-xl"
                        } tracking-wider ${
                          form.formState.errors.confirmPassword && "shake"
                        }`}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="*****"
                        {...field}
                      />
                      <div
                        onClick={toggleConfirmPassVisibility}
                        style={{ cursor: "pointer" }}
                        className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-inherit pl-1"
                      >
                        {showConfirmPass ? (
                          <Eye size={24} strokeWidth={2} color="#5E5E5E" />
                        ) : (
                          <Image
                            src={CloseEye}
                            width={24}
                            height={24}
                            alt="Closed eye icon"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              variant="gradient"
              size="lg"
              className="h-[59px] text-xl font-bold shadow-submit-btn"
            >
              {isLoading ? (
                <>
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Next"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center space-x-2">
        <p>Already have an account?</p>
        <Link href={"/candidate/login"} className="font-bold text-link">
          Sign In
        </Link>
      </CardFooter>
      <style jsx>
        {`
          input {
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid grey;
            max-width: 50%;
            width: 100%;
          }
        `}
      </style>
    </Card>
  );
};

export default SignUpForm;
