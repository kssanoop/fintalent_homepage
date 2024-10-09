import { ErrorBoundary } from "react-error-boundary";
import OverView from "./OverView";
import Profile from "./profile";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Body = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* left */}
      <div className="w-auto lg:w-[24%] lg:min-w-[340px]">
        <Profile />
      </div>
      {/* right */}
      <div className="w-full">
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
          <ScrollArea>
            <DynamicHeightContainer className="hidden md:block">
              <OverView />
            </DynamicHeightContainer>
            <div className="md:hidden">
              {" "}
              <OverView />
            </div>
          </ScrollArea>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Body;
