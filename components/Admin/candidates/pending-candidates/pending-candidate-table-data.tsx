import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import RejectPopupDialog from "../reject-popup-dialog";
import { useGetAllPendingCandidatesAdmin } from "@/features/get-candidates/admin/api/get-all-pending-candidates-admin";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { toast } from "sonner";
import { usePendingCandidatesAction } from "@/features/admin/candidate/api/approve-reject-pending-candidates";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, X } from "lucide-react";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { Button } from "@/components/ui/button";

interface HeaderDataRow {
  id: number;
  name: string;
}

const PendingCandidateTableData = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openDialogReject, setOpenDialogReject] = useState<boolean>(false);
  const [selectedCandidateId, setSeelectedCandidateId] = useState<string>();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const Headerdata: HeaderDataRow[] = [
    {
      id: 1,
      name: "Name",
    },
    {
      id: 2,
      name: "Email",
    },
    {
      id: 3,
      name: "Designation",
    },
    {
      id: 4,
      name: "Phone Number",
    },
    {
      id: 5,
      name: "City",
    },
  ];

  const {
    data: pendingCandidates,
    isLoading,
    isError,
    error,
  } = useGetAllPendingCandidatesAdmin();

  // console.log("pending candidates:", pendingCandidates);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedRows(
        pendingCandidates.map((row: CandidateSchema) => row?.candidateId),
      );
    } else {
      setSelectedRows([]);
    }
  };

  // toggle select
  const toggleSelectRow = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(id);
      const newSelectedRows = isSelected
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id];

      setSelectAll(newSelectedRows.length === pendingCandidates.length);
      return newSelectedRows;
    });
  };

  const handleSuccess = (data: any) => {
    console.log("Success:", data);
    queryClient.invalidateQueries(["pending-candidates-admin"]);
    toast.success(data?.message);
  };

  const handleError = (err: any) => {
    console.error("Error:", err);
    toast.error(err?.response?.data?.message);
  };

  const {
    mutate: actionCandidate,
    isLoading: isActionLoading,
    isError: isActionError,
  } = usePendingCandidatesAction(handleSuccess, handleError);

  // accept pending request
  function handleAccept(id: string): void {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true,
    }));

    actionCandidate({ candidateId: id, action: "approve" });
  }

  // reject pending request
  function handleReject(id: string): void {
    console.log("selected Id", id);
    setOpenDialogReject(true);
    setSeelectedCandidateId(id);
  }

  // handle routing
  const handleRouting = (event: any, candidateId: string) => {
    if (
      !event.target.closest("button") &&
      !event.target.closest("span") &&
      !event.target.closest("input")
    ) {
      // redirecting
      router.push(`${pathname}/${candidateId}?source=pending`);
    }
  };

  if (!isLoading && pendingCandidates?.length === 0) {
    return (
      <>
        {pendingCandidates?.length === 0 && (
          <div className="flex h-[80dvh] items-center justify-center">
            No Pending Candidates
          </div>
        )}
      </>
    );
  }

  if (isError) {
    return <div>{error as string}</div>;
  }

  return (
    <>
      <div className="ml-5 rounded-md border">
        <DynamicHeightContainer>
          <Table>
            <TableHeader>
              <TableRow>
                {Headerdata.map((row: HeaderDataRow) => (
                  <TableHead key={row.id}>
                    <div className="flex items-center">
                      <p className="pr-1">
                        {row.id === 1 && (
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                          />
                        )}
                      </p>
                      <span>{row.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCandidates?.map((row: CandidateSchema) => (
                <TableRow
                  key={row?.candidateId}
                  onClick={(event: any) => {
                    handleRouting(event, row?.candidateId);
                  }}
                  className="cursor-pointer text-sm font-medium text-[#5E5E5E]"
                  data-state={
                    selectedRows?.includes(Number(row?.candidateId))
                      ? "selected"
                      : ""
                  }
                >
                  <TableCell className="flex items-center gap-2 text-[#171717]">
                    <input
                      type="checkbox"
                      checked={selectedRows?.includes(Number(row?.candidateId))}
                      onChange={() => {
                        toggleSelectRow(Number(row?.candidateId));
                      }}
                    />
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${row?.profilePhoto?.storageName}`}
                        className="h-10 w-10"
                      />
                      <AvatarFallback>{row?.fullName}</AvatarFallback>
                    </Avatar>
                    <span>{row?.fullName}</span>
                  </TableCell>
                  <TableCell className="email">
                    <Link href={`mailto:${row?.email}`}>
                      <span>{row?.email}</span>{" "}
                    </Link>
                  </TableCell>
                  <TableCell>{row?.jobTitle}</TableCell>
                  <TableCell className="text-[#3790E3]">
                    {row?.phoneNo}
                  </TableCell>
                  <TableCell>{row?.personalDetails?.city}</TableCell>
                  <TableCell>
                    {/* button accept/reject */}
                    <div className="flex justify-end gap-2.5 self-end">
                      {isActionLoading &&
                      !isActionError &&
                      loadingStates[row?.candidateId] ? (
                        <Button
                          variant={"success"}
                          className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                          disabled
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Approving..
                        </Button>
                      ) : (
                        <Button
                          variant={"success"}
                          className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                          onClick={() => {
                            handleAccept(row?.candidateId);
                          }}
                        >
                          <div>Approve</div>
                          <Check color="#FFF" width={18} height={18} />
                        </Button>
                      )}
                      <Button
                        variant={"secondary"}
                        className="flex items-center gap-2.5 bg-[#ED6464] text-sm font-bold"
                        onClick={() => {
                          handleReject(row?.candidateId);
                        }}
                      >
                        <div>Reject</div>
                        <X color="#FFF" width={18} height={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DynamicHeightContainer>
      </div>
      <RejectPopupDialog
        setOpen={setOpenDialogReject}
        open={openDialogReject}
        candidateId={selectedCandidateId}
        heading={"Are you sure?"}
        descrption={"Doing this will reject this candidate."}
      />
    </>
  );
};

export default PendingCandidateTableData;
