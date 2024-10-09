import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement, useState } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import HeadBar from "@/components/layout/head-bar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import { useRouter } from "next/router";
import ManagerFilter from "@/components/Admin/managers/manager-filter";
import AddManager from "@/components/Admin/managers/add-edit-manager/add-manager";
import ManagerMenu from "@/components/Admin/managers/manager-menu/manager-menu";
import useGetManagersForAdmin from "@/features/admin/manager/api/get-managers-for-admin";
import { SubmitHandler, useForm } from "react-hook-form";
import { ManagerFilterForAdmin } from "@/features/admin/manager/type/manager-filter-for admin";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import AddEditManagerDialog from "@/components/Admin/managers/add-edit-manager/add-edit-manager-dialog";
import EditManagerForm from "@/components/Admin/managers/add-edit-manager/edit-manager-form";
import { ManagerInfo } from "@/features/admin/manager/type/manager-info";
import ManagerInactivateSheet from "@/features/inactivate/manager/manager-inactivate-sheet";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { useBoundStore } from "@/store/useBoundStore";

const TableFieldEmptyMessage = "Not provided";

const TableHeaderTitles = [
  {
    name: "Name & Manager ID",
  },
  {
    name: "Designation",
  },
  {
    name: "Recruiters assigned",
  },
  {
    name: "Team Leads assigned",
  },
];

const Managers = () => {
  const router = useRouter();
  const form = useForm<ManagerFilterForAdmin>({
    defaultValues: {
      companyName: "",
      name: "",
      employeeId: "",
      designation: "",
      department: "",
      phoneNo: "",
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const setInactivatingManager = useBoundStore(
    (state) => state.setInactivatingManager,
  );

  const {
    data: managers,
    isLoading,
    isError,
  } = useGetManagersForAdmin(form.getValues());

  const [isEditManager, setIsEditManager] = useState<{
    isDialogOpen: boolean;
    manager: ManagerInfo;
  }>({
    isDialogOpen: false,
    manager: {
      managerId: "",
      name: "",
      email: "",
      phoneNo: "",
      designation: "",
      employeeId: "",
      companies: [],
      teamLeads: [],
      profilePhoto: {
        storageName: "",
        originalName: "",
      },
    },
  });

  const [inactivateSheet, setInactivateSheet] = useState<{
    isSheetOpen: boolean;
    teamLeads: TeamLeadInfo[];
    companies: CompanyDataType[];
  }>({
    isSheetOpen: false,
    teamLeads: [],
    companies: [],
  });

  console.log(managers);

  const onFilterSubmit: SubmitHandler<ManagerFilterForAdmin> = (values) => {
    console.log(values);
  };

  const handleEditDialogOpen = (arg: boolean) => {
    setIsEditManager((prev) => ({ ...prev, isDialogOpen: arg }));
  };

  return (
    <>
      <div className="flex gap-4">
        <ManagerFilter form={form} onSubmit={onFilterSubmit} />
        <div className=" hide-scrollbar flex flex-1  overflow-auto rounded-[5px]">
          <Table className=" shadow ">
            <TableHeader className="m-0 border border-border  p-0">
              <TableRow className="p-0">
                {TableHeaderTitles.map((title) => (
                  <TableHead
                    key={crypto.randomUUID()}
                    className="w-[128px] whitespace-nowrap bg-[#EFEFEF] px-4 text-sm font-bold text-[#5E5E5E]"
                  >
                    {title.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <div className="flex h-[calc(100vh-150px)] w-full justify-center">
                {/* <Loader2 className="m-4 h-6 w-6  animate-spin" /> */}
              </div>
            ) : isError ? (
              <p className="p-4 text-center  text-xl text-brand-blue">
                Something went wrong
              </p>
            ) : managers.length === 0 ? (
              <p className="p-4 text-center  text-xl text-brand-blue">
                No managers to show
              </p>
            ) : (
              <TableBody className="hide-scrollbar max-h-[calc(100vh-150px)] cursor-pointer rounded-b-[5px] border border-solid border-[#E1E1E1] bg-white [&_tr:last-child]:border-b">
                {/* TODO: handle loading, error , and empty array */}
                {managers.map((manager) => (
                  <TableRow
                    key={manager.managerId}
                    onClick={() => {
                      console.log("clicked");
                      router.push(
                        `/admin/managers/${
                          manager.managerId
                        }?filters=${encodeURIComponent(
                          JSON.stringify(form.getValues()),
                        )}`,
                      );
                    }}
                    className=" border-border"
                  >
                    <TableCell>
                      <div className="flex gap-2">
                        <CardIcon className="h-9 w-9 rounded-full shadow">
                          <CardIconImage
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}${manager.profilePhoto?.storageName}`}
                            className="rounded-full"
                          />
                          <AvatarProfileFallback />
                        </CardIcon>
                        <div className="">
                          <h3 className="line-clamp-1 text-sm font-bold text-[#171717]">
                            {manager.name}
                          </h3>
                          <p className="line-clamp-1 break-all text-xs font-medium text-brand-grey">
                            Manager ID {manager.employeeId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-1/4 text-sm font-medium text-brand-grey">
                      <p className="line-clamp-2">
                        {" "}
                        {manager.designation || "Not provided"}
                      </p>
                    </TableCell>
                    <TableCell className="w-1/4 text-sm  font-medium text-brand-grey md:whitespace-nowrap">
                      {manager.companies ? (
                        <>
                          {" "}
                          {manager.companies.length === 0 && "Not provided"}
                          {manager.companies[0]?.companyName}{" "}
                          {manager.companies.length > 1
                            ? `and ${manager.companies.length - 1} other${
                                manager.companies.length - 1 > 1 ? "s" : ""
                              }`
                            : ""}
                        </>
                      ) : (
                        TableFieldEmptyMessage
                      )}
                    </TableCell>
                    <TableCell className=" w-1/4 text-sm  font-bold  text-brand-black  ">
                      <div className="gap[15px] flex justify-between">
                        <p className=" line-clamp-2">
                          {" "}
                          {manager.teamLeads
                            .map((teamLead) => teamLead.name)
                            .join(", ") || TableFieldEmptyMessage}
                        </p>
                        <ManagerMenu
                          manager={manager}
                          setIsEditManager={setIsEditManager}
                          setInactivateSheet={setInactivateSheet}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <AddEditManagerDialog
        title="Edit Manager"
        formComponent={
          <EditManagerForm
            manager={isEditManager.manager}
            handleOpen={handleEditDialogOpen}
          />
        }
        open={isEditManager.isDialogOpen}
        handleOpen={handleEditDialogOpen}
      />

      {inactivateSheet.companies && inactivateSheet.teamLeads && (
        <ManagerInactivateSheet
          companies={inactivateSheet.companies}
          teamLeads={inactivateSheet.teamLeads}
          isSheetOpen={inactivateSheet.isSheetOpen}
          setIsSheetOpen={(value: boolean) => {
            setInactivateSheet({
              isSheetOpen: value,
              teamLeads: [],
              companies: [],
            });
            !value && setInactivatingManager(null);
          }}
        />
      )}
    </>
  );
};

Managers.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Authorization
        forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <Layout>
          <div className="bg-default-gray flex h-screen w-full flex-col">
            <HeadBar
              heading="Managers"
              customRightSideComponent={<AddManager />}
            />
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
              <div className="scroll-container grow overflow-y-auto bg-white px-5 py-2">
                {page}
              </div>
            </ErrorBoundary>
          </div>
        </Layout>
      </Authorization>
    </>
  );
};

export default Managers;
