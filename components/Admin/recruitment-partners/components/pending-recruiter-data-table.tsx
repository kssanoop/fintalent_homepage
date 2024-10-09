import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PendingRecruitersPopup from "./reject-popup";
import RecruiterDataType from "@/features/recuitment-partners/admin/type/company-recruiter-data-type";
import { Skeleton } from "@/components/ui/skeleton";
import { modifyLink } from "@/components/modify-links/modify-links";

interface PendingRecruitersDataTableProps {
  pendingRecruitersData: RecruiterDataType[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const PendingRecruitersDataTable = ({
  pendingRecruitersData,
  isError,
  isLoading,
  error,
}: PendingRecruitersDataTableProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [acceptClick, setAcceptClick] = useState(false);
  const [recruiterData, setRecruiterData] = useState<
    RecruiterDataType | undefined
  >(undefined);
  const handleAcceptClick = (data: RecruiterDataType) => {
    setOpenPopup(true);
    setAcceptClick(true);
    setRecruiterData(data);
  };

  const handleRejectClick = () => {
    setOpenPopup(true);
    setAcceptClick(false);
  };

  console.log("pendingRecruitersData", pendingRecruitersData);

  const TableHeaderTitles = [
    {
      name: "Name & Email ID",
    },
    {
      name: "Designation",
    },
    {
      name: "Phone number",
    },
    {
      name: "Linkedin URL",
    },
    {
      name: "",
    },
  ];

  if (!isLoading && pendingRecruitersData?.length === 0) {
    return (
      <>
        {pendingRecruitersData?.length === 0 && (
          <div className="flex h-[50dvh] w-full items-center justify-center">
            No Pending Recruiter to show
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="rounded-t-[5px]  border border-solid border-[#E1E1E1]">
        <Table>
          <TableHeader className="m-0 p-0">
            <TableRow className="p-0">
              {TableHeaderTitles.map((title) => (
                <TableHead
                  key={crypto.randomUUID()}
                  className=" bg-[#EFEFEF] px-4 text-sm font-bold text-[#5E5E5E]"
                >
                  {title.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              {[...Array(8)]?.map(() => (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex  flex-col gap-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className=" text-sm font-medium text-[#5E5E5E]  md:whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="flex items-end justify-end">
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {pendingRecruitersData?.map((user: RecruiterDataType) => (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}${user?.profilePhoto?.storageName}`}
                        />
                        <AvatarFallback>{user?.fullName}</AvatarFallback>
                      </Avatar>
                      <div className="flex  flex-col">
                        <h3 className="text-sm font-bold text-[#171717]">
                          {user?.fullName}
                        </h3>
                        <p className=" text-xs font-medium text-[#5E5E5E]">
                          <Link href={`mailto:${user?.email}`}>
                            {" "}
                            {user?.email}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                    {user?.designation}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-[#5E5E5E]  md:whitespace-nowrap">
                    <a href={`tel:${user?.phoneNo}`}>{user?.phoneNo}</a>
                  </TableCell>
                  <TableCell className="">
                    <Link target="_blank" href={modifyLink(user?.linkedIn)}>
                      <p className="line-clamp-2 cursor-pointer flex-wrap text-sm font-medium text-[#034A9A]">
                        {" "}
                        {user?.fullName} | Linkedin
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell className="flex items-end justify-end">
                    <div className="flex gap-4">
                      <div
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5px] bg-[#5ED678]"
                        onClick={() => {
                          handleAcceptClick(user);
                        }}
                      >
                        <Check color="#fff" />
                      </div>

                      <div
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5px] bg-[#ED6464]"
                        onClick={handleRejectClick}
                      >
                        <X color="#fff" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <PendingRecruitersPopup
        setOpen={setOpenPopup}
        open={openPopup}
        acceptClick={acceptClick}
        data={recruiterData}
      />
    </>
  );
};

export default PendingRecruitersDataTable;
