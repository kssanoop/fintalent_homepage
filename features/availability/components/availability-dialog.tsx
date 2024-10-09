import { ErrorBoundary } from "react-error-boundary";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockedDates from "./blocked-dates/blocked-dates";
import AvailabilityFormContainer from "./availability/availability-form-container";

interface AvailabilityDialogProps {
  open: boolean;
  setOpen: (bool: boolean) => void;
}

export function AvailabilityDialog({ open, setOpen }: AvailabilityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-5 md:max-w-3xl md:p-8">
        <Tabs defaultValue="availability" className="flex flex-col md:flex-row">
          <TabsList className="flex h-auto flex-row items-start justify-start gap-5 rounded-none border-r border-r-border bg-white pr-14 md:flex-col">
            <TabsTrigger
              value="availability"
              className="rounded-none px-0 pb-3 text-base font-normal data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold md:p-0 md:px-3 md:data-[state=active]:border-b-0 lg:data-[state=active]:font-semibold"
            >
              Availability
            </TabsTrigger>
            <TabsTrigger
              value="blocked-dates"
              className="rounded-none px-0 pb-3 text-base font-normal data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold md:p-0 md:px-3 md:data-[state=active]:border-b-0 lg:data-[state=active]:font-semibold"
            >
              Blocked dates
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="availability"
            className="w-full ring-offset-0 md:pl-14"
          >
            {/* TODO: Error boundary to be reused */}
            <ErrorBoundary
              fallback={
                <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
                  Something went wrong! Unable to fetch data.
                </div>
              }
              onError={(error: any, errorInfo) => {
                console.log("Error caught!", error);
              }}
            >
              <AvailabilityFormContainer setOpen={setOpen} />
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="blocked-dates" className="w-full md:pl-14">
            <BlockedDates />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
