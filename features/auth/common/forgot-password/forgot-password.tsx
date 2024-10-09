import { useForm } from "react-hook-form";
import { type forgotPWSchema } from "@/features/auth/schema/auth-schema";
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

import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { RoleTypes } from "@/types/authorization";
import useSendPasswordResetLink from "../../api/send-password-reset-link";
import { toast } from "sonner";
// import SetNewPasswordForm from "./new-password";

const ForgotPasswordForm = ({ role }: { role: RoleTypes }) => {
  const form = useForm<forgotPWSchema>();
  const router = useRouter();
  const handleSuccess = (data: any) => {
    toast.success("Password resetting link is send to the provided email");
  };
  const handleError = (error: any) => {
    toast.error(error.response.data.message);
  };
  const { mutate, isLoading, isError } = useSendPasswordResetLink(
    handleSuccess,
    handleError,
  );

  const onSubmit = (values: forgotPWSchema) => {
    console.log(values);
    mutate(values.email);
  };

  return (
    <Card className="w-[462px] border-0 bg-background shadow-none">
      <CardHeader className="space-y-1 px-0 pb-8 text-center md:space-y-3">
        <CardTitle className="text-2xl font-extrabold text-brand-black md:text-[32px]">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-base font-medium leading-6 text-brand-grey">
          We&apos;ll send a password reset link to the registered email ID
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-10 md:pb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              rules={{
                required: { value: true, message: "Email is required" },
                pattern: {
                  message: "Enter an email address",
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                },
              }}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-[86px] space-y-1 md:mb-10">
                  <FormLabel className="text-brand-black">Email ID</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="eg: joe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading && !isError}
              type="submit"
              variant="gradient"
              size="lg"
              style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
              className="h-[59px] text-xl font-bold"
            >
              {isLoading && !isError ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className=" justify-center">
        <button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push(`/${role}/login`);
          }}
          className="flex font-medium text-brand-grey"
        >
          <ChevronLeft size={24} strokeWidth={1.8} color="#5E5E5E" />
          Back to login
        </button>
      </CardFooter>
      {/* <SetNewPasswordForm /> */}
    </Card>
  );
};

export default ForgotPasswordForm;
