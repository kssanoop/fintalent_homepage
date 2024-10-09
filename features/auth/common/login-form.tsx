import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { type loginSignUpSchema } from "@/features/auth/schema/auth-schema";
import { useRouter } from "next/router";
import { toast } from "sonner";

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
import { Eye, Loader2 } from "lucide-react";
import CloseEye from "@/features/auth/candidate/eye_close.svg";
import useLogin from "@/features/auth/api/login-signup";
import handleRedirection from "@/features/auth/util/route-util";
import { RoleTypes } from "@/types/authorization";
import _ from "lodash";

export default function LoginForm({ role }: { role: RoleTypes }) {
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

  const form = useForm<loginSignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      role,
    },
    reValidateMode: "onSubmit",
  });

  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/${role}`);
  }, [role, router]);

  const handleSuccess = async (data: any) => {
    const response = data.data?.userDetails as handleRedirectionProps;

    if (response.docStatus === "active") {
      await handleRedirection(response, router);
    } else {
      await router.push("/account-inactive");
    }
    toast.success("Sign in successful");
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error?.response?.data?.message);
  };

  const { mutate, isLoading, isError } = useLogin(handleSuccess, handleError);

  const onSubmit = async (values: loginSignUpSchema) => {
    console.log("Data submitted :", values);
    values.action = "signin";
    mutate(values);
  };

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Card className="w-[462px] border-0 bg-background shadow-none">
      <CardHeader className="space-y-1 p-0 text-center md:p-4">
        <CardDescription className="text-base">
          Welcome{role !== ("admin" && "manager") && " back"}!
        </CardDescription>
        <CardTitle className="text-2xl font-extrabold md:text-[32px]">
          {role !== ("candidate" && "recruiter")
            ? `Login as ${
                role === "teamlead" ? "Team Lead" : _.startCase(role)
              }`
            : "Login to your Account!"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col"
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
                <FormItem className="mb-6 space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              )}
            />
            <Link
              href={`/${role}/forgot-password`}
              className="mb-10 ml-auto font-semibold text-link"
            >
              Forgot password?
            </Link>

            <Button
              type="submit"
              variant="gradient"
              disabled={isLoading && !isError}
              size="lg"
              // style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
              className="h-[59px] text-xl font-bold shadow-submit-btn"
            >
              {isLoading && !isError ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In..{" "}
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {!(role === "admin" || role === "manager" || role === "teamlead") && (
        <CardFooter className="mt-10 flex-wrap justify-center space-x-2 md:mt-6">
          <p>Don&lsquo;t have an account?</p>
          <Link href={`/${role}/signup`} className="font-bold text-link">
            Sign Up
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
