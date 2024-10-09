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
import LinkedinIcon from "@/public/svg/LinkedinIcon";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { useRouter } from "next/router";
import { modifyLink } from "@/components/modify-links/modify-links";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

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

const RecruitmentCompaniesTable = ({
  companyListData,
  isLoading,
}: {
  companyListData: CompanyDataType[] | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const { role } = useGetInfoFromCookie();

  const handleRedirect = (
    event: React.MouseEvent,
    company: CompanyDataType,
  ) => {
    const isLinkClick =
      (event.target as HTMLElement).tagName === "A" &&
      (event.target as HTMLElement).closest("a") !== null;
    if (isLinkClick) {
      event.preventDefault();
    } else {
      router.push(`/${role}/recruitment-partners/${company?._id}`);
    }
  };
  console.log("company List Data:", companyListData);

  return (
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
        {isLoading ? (
          <>
            {[...Array(8)].map(() => {
              return (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell>
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
          companyListData?.map((company: any) => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell
                onClick={(event) => {
                  handleRedirect(event, company);
                }}
              >
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
                        href={modifyLink(company?.companyLinkedIn) || "#"}
                        target="_blank"
                        className="h-[18px] w-[18px]"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon size={18} />
                      </Link>
                      <Link
                        href={modifyLink(company?.companyWebsite) || "#"}
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
                {/* ₹ {company.billGenerated} */}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default RecruitmentCompaniesTable;
