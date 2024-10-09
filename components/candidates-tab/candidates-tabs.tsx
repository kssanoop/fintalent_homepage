import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type CandidatesTabProps = {
  tabs: Array<{
    label: string;
    slug: string;
    content: JSX.Element;
  }>;
};

const CandidatesTabs = ({ tabs }: CandidatesTabProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") || tabs[0].slug;

  return (
    <>
      <Tabs value={defaultTab} className="h-[cal(100%-10px)] bg-white">
        <TabsList className="mb-3 w-full justify-start gap-[15px] overflow-hidden overflow-x-auto rounded-none border-b border-[#E1E1E1] bg-inherit px-5">
          {tabs.map(({ label, slug }) => (
            <Link key={label} href={`${pathname}?type=${slug}`}>
              <TabsTrigger
                value={slug}
                className="text-brand rounded-none px-0 pb-2 pt-2  text-left data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59] "
              >
                {label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
        {tabs.map(({ label, slug, content }) => (
          <TabsContent key={label} value={slug}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default CandidatesTabs;
