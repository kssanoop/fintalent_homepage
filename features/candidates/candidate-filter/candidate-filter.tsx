// import FilterList from "@/components/search/filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// import {
//   CandidateFilters,
//   defaultCandidateFilters,
// } from "@/lib/constants/filters/candidatesFilter";

const CandidateFilter = () => {
  return (
    <Card className="h-full rounded-[10px] pb-4">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-brand-black">
          Filters
        </CardTitle>
        <Sheet>
          <SheetTrigger className="m-0">
            <p className="hidden text-sm font-bold text-brand-blue-light md:block">
              view all
            </p>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-white px-4 py-3">
            <h4 className="p-4 font-bold text-brand-black">All filters</h4>
            <div className="scroll-container h-[calc(100%-136px)] overflow-auto">
              {/* <FilterList list={CandidateFilters} /> */}
            </div>
            <SheetFooter className="flex-row p-5">
              <Button
                variant="outline"
                className="border-0 bg-[#EFEFEF] text-brand-black"
              >
                Reset
              </Button>
              <Button>Apply filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="scroll-container h-[calc(100%-56px)] overflow-auto p-0">
        {/* <FilterList list={defaultCandidateFilters} /> */}
      </CardContent>
    </Card>
  );
};

export default CandidateFilter;
