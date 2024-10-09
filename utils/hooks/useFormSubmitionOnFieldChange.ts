import { useEffect } from "react";

export const useFormSubmitionOnFieldChange = ({
  form,
  onSubmit,
  enabled = true,
}: {
  form: any;
  onSubmit: any;
  enabled?: boolean;
}) => {
  useEffect(() => {
    if (enabled) {
      const subscription = form.watch(() => {
        // setTimeout(
        // () => {
        form.handleSubmit(onSubmit)();
        // },
        // 2 * 60 * 1000,
        // ); // 2 minutes in milliseconds
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [form, onSubmit, enabled]);
};
