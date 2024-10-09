import ProfileViewsListingDialog from "@/components/profile-views-listing/profile-views-listing-dialog";
import ViewedProfileCard from "@/components/profile-views-listing/viewed-profile-card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetBillingsOfCompany from "@/features/billings/api/get-billings-of-company";
import useUpdateBillingStatus from "@/features/billings/api/update-billing-status";
import { Billing } from "@/features/billings/types/billing";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const TableHeaders = [
  {
    id: 1,
    label: "Bill ID",
  },
  {
    id: 2,
    label: "Date of bill generation",
  },
  {
    id: 3,
    label: "Bill period",
  },
  {
    id: 4,
    label: "Total profile views",
  },
  {
    id: 5,
    label: "Total amount",
  },
  {
    id: 6,
    label: "Total amount",
  },
];

const BllingStatusChangeButtton = ({ item }: { item: Billing }) => {
  const { mutate, isLoading } = useUpdateBillingStatus();

  return (
    <>
      {item.paid ? (
        <Button
          disabled={isLoading}
          variant={"outline"}
          className="w-[51px] border-border bg-inherit text-xs font-bold text-brand-grey"
          onClick={() => {
            mutate({ billingId: item._id, action: "unpaid" });
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Undo"
          )}
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          variant={"success"}
          className="w-[68px] text-xs font-bold"
          onClick={() => {
            mutate({ billingId: item._id, action: "paid" });
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Confirm"
          )}
        </Button>
      )}
    </>
  );
};

const BillingHistoryTable = ({
  isEditable = false,
}: {
  isEditable?: boolean;
}) => {
  const [profileViewsListingDialog, setProfileViewListingDialog] = useState<{
    isOpen: boolean;
    type: "verified" | "unverified";
    data: Billing["candidateUnVerifiedViewListWithCandidates"];
  }>({
    isOpen: false,
    type: "verified",
    data: [],
  });

  const router = useRouter();

  const {
    data,
    isError,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetBillingsOfCompany({ companyId: router.query.companyId as string });
  const { ref } = useFetchNextListOnView({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isError) return <div>Something went wrong</div>;
  const billings = data?.pages.flatMap((pg) => pg.data);
  return (
    <div className="flex grow rounded-xl border border-solid border-[#E1E1E1] bg-white">
      {data?.pages[0].count === 0 ? (
        <p className="mx-auto my-6 text-center text-xl text-brand-blue">
          No data to show.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {TableHeaders?.map((item: { id: number; label: string }, i) => {
                if (TableHeaders.length === i + 1 && !isEditable) {
                  return null;
                }
                return (
                  <TableHead
                    className="text-sm font-extrabold text-[#5E5E5E]"
                    key={crypto.randomUUID()}
                  >
                    {item?.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {billings?.map((item, i) => (
              <TableRow
                key={item._id}
                ref={billings.length === i + 1 ? ref : null}
              >
                <TableCell className="text-sm font-bold text-brand-black">
                  {item?.billId}
                </TableCell>
                <TableCell className="text-sm font-normal text-brand-black">
                  {item.createdAt
                    ? format(new Date(item.createdAt), "d MMM, yyyy")
                    : "NA"}
                </TableCell>
                <TableCell>
                  {format(new Date(item.fromDate), "d MMM, yyyy")} -{" "}
                  {format(new Date(item.toDate), "d MMM, yyyy")}
                </TableCell>
                <TableCell className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-brand-black">
                    {isSuccess &&
                      item.profileViews?.unverified +
                        item?.profileViews?.verified}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p
                      onClick={() => {
                        setProfileViewListingDialog({
                          isOpen: true,
                          type: "verified",
                          data: item.candidateVerifiedViewListWithCandidates,
                        });
                      }}
                      className="cursor-pointer text-sm font-normal text-[#5E5E5E]"
                    >
                      {item?.profileViews.verified} veriified
                    </p>
                    <div className="h-1 w-1 rounded-full bg-[#5E5E5E]" />
                    <p
                      onClick={() => {
                        setProfileViewListingDialog({
                          isOpen: true,
                          type: "unverified",
                          data: item.candidateUnVerifiedViewListWithCandidates,
                        });
                      }}
                      className="cursor-pointer text-sm font-normal text-[#5E5E5E]"
                    >
                      {item?.profileViews.unverified} unveriified
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-bold text-brand-black">
                  ₹ {item?.finalAmount}
                </TableCell>
                {isEditable && (
                  <TableCell className="text-sm font-bold text-brand-black">
                    <BllingStatusChangeButtton item={item} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <ProfileViewsListingDialog
        open={profileViewsListingDialog.isOpen}
        setOpen={(value: boolean) => {
          setProfileViewListingDialog({
            isOpen: value,
            type: "verified",
            data: [],
          });
        }}
      >
        <ProfileViewsListingDialog.Title>
          {profileViewsListingDialog.data.length}{" "}
          {profileViewsListingDialog.type} profile views
        </ProfileViewsListingDialog.Title>
        <ProfileViewsListingDialog.ListingContainer>
          {profileViewsListingDialog.data.map((profile) => (
            <ViewedProfileCard key={profile.candidateId}>
              <ViewedProfileCard.Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${profile.profilePhoto.storageName}`}
              />
              <div>
                <ViewedProfileCard.Name
                  isVerified={profileViewsListingDialog.type === "verified"}
                >
                  {profile.fullName}
                </ViewedProfileCard.Name>
                <ViewedProfileCard.Designation>
                  {profile.jobTitle}
                </ViewedProfileCard.Designation>
              </div>
            </ViewedProfileCard>
          ))}
        </ProfileViewsListingDialog.ListingContainer>
      </ProfileViewsListingDialog>
    </div>
  );
};

export default BillingHistoryTable;
