import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  TrustScore,
  useUpdateCandidateTrustScore,
} from "@/features/ProfileEdit/trust-score/api/update-candidate-trust-score";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditTrustScoreDialog = ({
  open,
  setOpen,
  trustScore,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  trustScore: string;
}) => {
  const router = useRouter();
  const candidateId = router.query?.candidateId as string;

  const queryClient = useQueryClient();
  const form = useForm<TrustScore>({
    defaultValues: {
      trustScore,
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["get-candidate-by-id"] });
    setOpen(false);
  };

  const handleError = (err: any) => {
    toast.error(err?.response?.data?.message);
  };

  const { mutate, isLoading } = useUpdateCandidateTrustScore(
    handleSuccess,
    handleError,
  );

  const onSubmit: SubmitHandler<TrustScore> = (values) => {
    mutate({
      trustScore: values.trustScore,
      candidateId,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-[30px] py-5">
          <div className="flex flex-col gap-4">
            <DialogHeader className="flex flex-col pt-4">
              <DialogTitle className=" text-base font-bold text-[#171717]">
                Edit Trust Score
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="trustScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-3.5">
                  <Button
                    type="button"
                    variant={"outline"}
                    className="border border-border bg-[#F2F2F2] text-base font-bold text-[#171717] hover:text-[#171717]"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant={"gradient"} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving..
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTrustScoreDialog;
