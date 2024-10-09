import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import JobCardBody from "./JobCardBody";
import JobCardFooter from "./JobCardFooter";
import { Card } from "@/components/ui/card";
import JobCardPopup from "./JobCardPopup";

interface Props {
  section?: string;
  selectedTab?: string;
  data?: any;
}

const JobsCard = ({ section, selectedTab, data }: Props) => {
  return (
    <Card className="w-full">
      <div className=" hidden flex-col gap-4 p-6 md:flex">
        <Dialog>
          <DialogTrigger>
            <JobCardBody
              popup={false}
              section={section}
              selectedTab={selectedTab}
              data={data}
            />
          </DialogTrigger>
          <DialogContent className="p-0">
            <JobCardPopup
              section={section}
              selectedTab={selectedTab}
              data={data}
            />
          </DialogContent>
        </Dialog>
        <DialogFooter>
          {section === "JobsTabs" &&
          selectedTab !== "inviteAccepted" &&
          selectedTab !== "interViewScheduled" &&
          selectedTab !== "hired" &&
          selectedTab !== "rejected" ? (
            <JobCardFooter
              section="JobsTabs"
              selectedTab={selectedTab}
              data={data}
            />
          ) : (
            section !== "JobsTabs" && <JobCardFooter data={data} />
          )}
        </DialogFooter>
      </div>

      {/* drawer {mobile} */}
      <div className="p-6 md:hidden">
        <Drawer>
          <DrawerTrigger>
            <JobCardBody
              popup={false}
              section={section}
              selectedTab={selectedTab}
              data={data}
            />{" "}
          </DrawerTrigger>
          <DrawerContent>
            <JobCardPopup
              section={section}
              selectedTab={selectedTab}
              data={data}
            />
          </DrawerContent>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {section === "JobsTabs" &&
            selectedTab !== "inviteAccepted" &&
            selectedTab !== "interViewScheduled" &&
            selectedTab !== "hired" &&
            selectedTab !== "rejected" ? (
              <JobCardFooter
                section="JobsTabs"
                selectedTab={selectedTab}
                data={data}
              />
            ) : (
              section !== "JobsTabs" && <JobCardFooter data={data} />
            )}
          </div>
        </Drawer>
      </div>
    </Card>
  );
};

export default JobsCard;
