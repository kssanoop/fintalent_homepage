import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangeCompnayViewCost } from "@/features/recuitment-partners/admin/api/change-company-view-cost";
// import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import { useQueryClient } from "@tanstack/react-query";
// import { debounce } from "lodash";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BillingAmountProps {
  unverifiedViewCost?: number;
  verifiedViewCost?: number;
  companyId: string;
}

export type BillingAmountFormType = {
  verifiedViewCost: number | undefined;
  unverifiedViewCost: number | undefined;
};

type BillingAmountDataType = {
  title: string;
  value: number;
  name: keyof BillingAmountFormType;
};

const BillingAmount = ({
  unverifiedViewCost,
  verifiedViewCost,
  companyId,
}: BillingAmountProps) => {
  console.log(verifiedViewCost);
  const queryClient = useQueryClient();
  const BillTitles: BillingAmountDataType[] = [
    {
      title: "for verified profile",
      value: unverifiedViewCost ?? 0,
      name: "verifiedViewCost",
    },
    {
      title: "for non - verified profile",
      value: verifiedViewCost ?? 0,
      name: "unverifiedViewCost",
    },
  ];

  const form = useForm({
    defaultValues: {
      verifiedViewCost,
      unverifiedViewCost,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    form.setValue("verifiedViewCost", verifiedViewCost);
    form.setValue("unverifiedViewCost", unverifiedViewCost);
  }, [form, unverifiedViewCost, verifiedViewCost]);

  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    console.log("first");
    queryClient.invalidateQueries({ queryKey: ["company-by-id"] });
    // toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate } = useChangeCompnayViewCost(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  // const debouncedSubmit = debounce((values) => {
  //   // console.log("form submitted:", values);
  //   mutate({ companyId, data: values });
  // }, 3000);

  const onSubmit: SubmitHandler<BillingAmountFormType> = async (values) => {
    mutate({ companyId, data: values });
  };
  // useFormSubmitionOnFieldChange({ form, onSubmit });

  return (
    <Card className="flex w-[241x] flex-col gap-[11px] border-[#EFEFEF] px-5 py-3 pb-[30px] shadow-lg">
      <h5 className="text-sm font-bold text-[#171717]">
        Billing amount per click
      </h5>
      <Form {...form}>
        <form className="space-y-2">
          {BillTitles?.map((item) => (
            <div key={item?.name}>
              <FormField
                control={form.control}
                name={item?.name as "unverifiedViewCost" | "verifiedViewCost"}
                render={({ field }) => (
                  <FormItem className="m-0 flex flex-col gap-0 p-0">
                    <FormLabel className="text-sm font-normal text-[#171717]">
                      {item?.title}
                    </FormLabel>
                    <FormControl style={{ padding: 0, margin: 0 }}>
                      <div className="relative">
                        <Input
                          {...form.register(
                            item.name,
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            { onBlur: form.handleSubmit(onSubmit) },
                          )}
                          type="number"
                          defaultValue={item?.value}
                          onKeyDown={(e) => {
                            if (!/^\d+$/.test(e.key) && e.key !== "Backspace") {
                              e.preventDefault();
                            }
                          }}
                          className="relative h-[27.2px] rounded-[2.563px] border-[#CDCDCD] pr-[18px] text-xl font-bold text-[#171717]"
                          {...field}
                        />
                        <p className="absolute bottom-[3px] right-1.5 top-[3px] text-base font-medium text-[#A9A9A9]">
                          ₹
                        </p>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </form>
      </Form>
    </Card>
  );
};

export default BillingAmount;
