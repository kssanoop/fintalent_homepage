import AvatarCompanyFallback from "@/components/avatar-company-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { UseQueryResult } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const TableHeaderTitles = [
  {
    name: "Company",
  },
  {
    name: "No. of recruiters",
  },
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

const BillingTable = ({
  dataResponse,
}: {
  dataResponse: UseQueryResult<
    // eslint-disable-next-line @typescript-eslint/array-type
    Array<
      CompanyDataType & {
        recruiters: number;
        jobPosted: number;
        candidateViews: number;
        billAmount: number;
      }
    >,
    unknown
  >;
}) => {
  const { isLoading, data } = dataResponse;
  const router = useRouter();
  const pathName = usePathname();

  const handleRedirect = (companyid: string) => {
    router.push(`${pathName}/${companyid}`);
  };
  return (
    <div className="rounded-t-[5px]  border border-solid border-[#E1E1E1]">
      <Table>
        <TableHeader className="m-0 p-0">
          <TableRow className="p-0">
            {TableHeaderTitles.map((title, i) => (
              <TableHead
                key={crypto.randomUUID()}
                className={`w-[128px] bg-[#EFEFEF] px-4 text-sm font-bold text-[#5E5E5E] `}
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
            {data?.map((company) => (
              <TableRow
                onClick={() => {
                  handleRedirect(company._id);
                }}
                key={company._id}
                className="cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-12 w-12 rounded-[6px]">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${company?.companyLogo.storageName}`}
                      />
                      <AvatarCompanyFallback className="rounded-[6px]" />
                    </Avatar>
                    <div className=" w-[128px] text-sm font-bold text-[#171717]">
                      {company.companyName}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E]">
                  {company.recruiters}
                </TableCell>
                <TableCell className="w-[128px]  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  {company.jobPosted}
                </TableCell>
                <TableCell className="w-[128px]  text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  {company.candidateViews}
                </TableCell>
                <TableCell className="w-[128px] text-sm font-medium text-[#5E5E5E] md:whitespace-nowrap">
                  ₹ {company.billAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default BillingTable;
