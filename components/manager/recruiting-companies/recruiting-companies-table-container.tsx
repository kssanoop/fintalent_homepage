import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
// import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import LinkedinIcon from "@/public/svg/LinkedinIcon";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CompanyFilter from "@/components/Admin/recruitment-partners/components/company-filter";
import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import { Skeleton } from "@/components/ui/skeleton";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdminCompanyFilter } from "@/features/admin/recruitment-partner/type/admin-company-filter-recruitment";
import { modifyLink } from "@/components/modify-links/modify-links";

const TableHeaderTitles = [
  {
    name: "Company",
  },
  {
    name: "No. of recruiters",
  },
  {
    name: "Candidates hired",
  },
  // {
  //   name: "Industry",
  // },
  {
    name: "Jobs Posted",
  },
  {
    name: "Profile Clicks",
  },
  {
    name: "Bill amount",
  },
];

const RecruitingCompaniesTableContainer = () => {
  const router = useRouter();

  const handleRedirect = (event: React.MouseEvent, company: any) => {
    const isLinkClick =
      (event.target as HTMLElement).tagName === "A" &&
      (event.target as HTMLElement).closest("a") !== null;
    if (isLinkClick) {
      event.preventDefault();
    } else {
      router.push(`recruiting-companies/${company?._id}`);
    }
  };

  const form = useForm<AdminCompanyFilter>({
    defaultValues: {
      companyName: "",
      locations: [],
      dateAdded: "",
      recruiters: "",
      jobPosted: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    data: companyListData,
    isLoading: isCompnayDataLoading,
    isError: isCompanyDataError,
  } = useGetAllCompanyList(form.getValues());

  console.log("company List Data:", companyListData);

  if (isCompanyDataError) {
    return <div>Error while fetching companies list</div>;
  }

  const onFilterSubmit: SubmitHandler<AdminCompanyFilter> = (values) => {
    const hasFilter = Object.values(values).some(
      (value) =>
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "string" && value !== "") ||
        (typeof value === "number" && value !== 0),
    );

    if (hasFilter) {
      console.log(values);
    }
  };

  return (
    <div className="flex w-full gap-5">
      {/* filter card */}
      <CompanyFilter form={form} onSubmit={onFilterSubmit} />
      {companyListData?.pages[0].count === 0 ? (
        <p className="w-full text-center text-lg text-brand-blue">
          No recruiting companies found
        </p>
      ) : (
        <DynamicHeightContainer>
          <div className="hide-scrollbar flex  w-full flex-1 overflow-auto rounded-t-[5px] border border-solid border-[#E1E1E1]">
            <Table>
              <TableHeader className="m-0 p-0">
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
              <TableBody className=" cursor-pointer">
                {isCompnayDataLoading ? (
                  <>
                    {[...Array(8)].map(() => {
                      return (
                        <TableRow key={crypto.randomUUID()}>
                          <TableCell key={crypto.randomUUID()}>
                            <div className="flex gap-2">
                              <Skeleton className="h-11 w-12 rounded-sm" />
                              <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-11 rounded-sm" />
                                <div className="flex gap-1.5">
                                  <Skeleton className="h-5 w-5" />
                                  <Skeleton className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          {[...Array(6)].map(() => {
                            return (
                              <TableCell key={crypto.randomUUID()}>
                                <Skeleton className="h-8 w-16" />
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  companyListData?.pages
                    .flatMap((pg) => pg.data)
                    .map((company: any) => (
                      <TableRow
                        key={crypto.randomUUID()}
                        onClick={(event) => {
                          handleRedirect(event, company);
                        }}
                      >
                        <TableCell>
                          <div className="flex gap-2">
                            <CardIcon className="h-12 w-12">
                              <CardIconImage
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}${company?.companyLogo?.storageName}`}
                              />
                              <CardIconFallback>CN</CardIconFallback>
                            </CardIcon>
                            <div className="flex flex-col gap-2 md:w-[339px]">
                              <h3 className="text-sm font-bold text-[#171717]">
                                {company?.companyName}
                              </h3>
                              <div className="flex gap-1.5">
                                <Link
                                  href={
                                    modifyLink(company?.companyLinkedIn) || "#"
                                  }
                                  target="_blank"
                                  className="h-[18px] w-[18px]"
                                  rel="noopener noreferrer"
                                >
                                  <LinkedinIcon size={18} />
                                </Link>
                                <Link
                                  href={
                                    modifyLink(company?.companyWebsite) || "#"
                                  }
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <Globe color="#0076B2" size={18} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="w-[128px] text-sm  font-medium text-[#5E5E5E]">
                          {company?.recruiters}
                        </TableCell>
                        <TableCell className="w-[128px] text-sm  font-medium text-[#5E5E5E] md:whitespace-nowrap">
                          {company?.candidatesHired}
                        </TableCell>
                        <TableCell className="w-[128px] text-sm  font-medium text-[#5E5E5E]">
                          {company?.jobPosted}
                        </TableCell>
                        <TableCell>
                          <div className="w-[128px]">
                            <p className="text-sm  font-medium text-[#5E5E5E]">
                              {company?.candidateViews}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="w-[128px] text-sm  font-medium text-[#5E5E5E]">
                          ₹ {company?.billAmount}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </DynamicHeightContainer>
      )}
    </div>
  );
};

export default RecruitingCompaniesTableContainer;
