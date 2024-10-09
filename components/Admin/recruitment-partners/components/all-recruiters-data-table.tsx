import { modifyLink } from "@/components/modify-links/modify-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RecruiterDataType from "@/features/recuitment-partners/admin/type/company-recruiter-data-type";
import Link from "next/link";
import React from "react";

interface AllRecruitersDataTableProps {
  companyReruiterData: RecruiterDataType[];
  isError: boolean;
  isLoading: boolean;
  error: any;
}

const AllRecruitersDataTable = ({
  isError,
  isLoading,
  error,
  companyReruiterData,
}: AllRecruitersDataTableProps) => {
  const TableHeaderTitles = [
    {
      name: "Name & Email ID",
    },
    {
      name: "Location",
    },
    {
      name: "Designation",
    },
    {
      name: "Phone number",
    },
    {
      name: "Jobs Posted",
    },
    {
      name: "Profile Clicks",
    },
    {
      name: "Bill generated",
    },
    {
      name: "Linkedin URL",
    },
  ];

  // console.log("recruiter data:", companyReruiterData);

  if (isError) {
    return <div>{error as string}</div>;
  }

  if (!isLoading && companyReruiterData?.length === 0) {
    return (
      <>
        {companyReruiterData?.length === 0 && (
          <div className="flex h-[50dvh] w-full items-center justify-center">
            No Active Recruiter to show
          </div>
        )}
      </>
    );
  }

  return (
    <div className="rounded-t-[5px]  border border-solid border-[#E1E1E1]">
      <Table>
        <TableHeader className="m-0 p-0">
          <TableRow className="p-0">
            {TableHeaderTitles.map((title) => (
              <TableHead
                key={crypto.randomUUID()}
                className="w-[128px] bg-[#EFEFEF] px-4 text-sm font-bold text-[#5E5E5E]"
              >
                {title.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            {[...Array(8)].map(() => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell>
                  <div className="flex gap-1.5">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex w-[128px] flex-col gap-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E]">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell className="w-[128px]  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell className="w-[128px] text-sm font-bold text-[#171717]">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <div className="flex  w-[128px] flex-col gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </TableCell>
                <TableCell className="w-[128px] text-sm font-bold text-[#171717]">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell className="w-[128px]">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {companyReruiterData?.map((user: RecruiterDataType) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell>
                  <div className="flex gap-1.5">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${user?.profilePhoto?.storageName}`}
                      />
                      <AvatarFallback>{user?.fullName}</AvatarFallback>
                    </Avatar>
                    <div className="flex w-[128px] flex-col">
                      <h3 className="text-sm font-bold text-[#171717]">
                        {user?.fullName}
                      </h3>
                      <p className="w-[128px] text-xs font-medium text-[#5E5E5E]">
                        <Link href={`mailto:${user?.email}`}>
                          {" "}
                          {user?.email}
                        </Link>
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E]">
                  {user?.location}
                </TableCell>
                <TableCell className="w-[128px]  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  {user?.designation}
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  {user?.phoneNo && (
                    <a href={`tel:${user.phoneNo}`} className="text-[#5E5E5E]">
                      {user.phoneNo}
                    </a>
                  )}
                </TableCell>
                <TableCell className="w-[128px] text-sm font-bold text-[#171717]">
                  {user?.jobPosted}
                </TableCell>
                <TableCell>
                  <div className="flex  w-[128px] flex-col gap-2">
                    <p className="text-sm font-bold text-[#171717]">
                      {user?.candidateVerifiedViews}{" "}
                      <span className="text-sm font-normal text-[#5E5E5E]">
                        {" "}
                        verified
                      </span>
                    </p>
                    <p className="text-sm font-bold text-[#171717]">
                      {user?.candidateUnverifiedViews}{" "}
                      <span className="tesxt-sm font-normal text-[#5E5E5E]">
                        {" "}
                        non-verified
                      </span>
                    </p>
                  </div>
                </TableCell>
                <TableCell className="w-[128px] text-sm font-bold text-[#171717]">
                  ₹ {user?.billingAmount}
                </TableCell>
                <TableCell className="w-[128px]">
                  <Link target="_blank" href={modifyLink(user?.linkedIn)}>
                    <p className="line-clamp-2 cursor-pointer flex-wrap text-sm font-medium text-[#034A9A]">
                      {" "}
                      {user?.fullName} | Linkedin
                    </p>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default AllRecruitersDataTable;
