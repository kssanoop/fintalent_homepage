// import MobileSidebar from "../sidebar/mobile-sidebar";
import { useLayoutResponsiveHeight } from "@/utils/hooks/useLayoutResponsiveHeight";
import Sidebar from "../sidebar/sidebar";
import React, { useEffect, useState } from "react";
import useMeasure from "@/utils/hooks/useMeasure";
import { useBoundStore } from "@/store/useBoundStore";
import { useRouter } from "next/router";

const MemoisedSideBar = React.memo(Sidebar);

const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useRouter();

  const [isloaded, setloaded] = useState(false);
  useLayoutResponsiveHeight();

  const {
    ref,
    dimensions: { width },
  } = useMeasure();

  const updateSidebarWidth = useBoundStore((state) => state.updateWidth);
  // store the sidebar width to the global store
  if (width) updateSidebarWidth(width);

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!isloaded) {
    return null;
  }

  // NOTE: only need to calculate side bar width on this specified page,
  // hence only need to assign the ref to this specified page.
  // Sidebar width is used on this page only to fix the overflow issue caused by the carousel component
  const assignRef = pathname === "/candidate/jobs";

  return (
    isloaded && (
      <div id="layout-container" className="flex">
        <div ref={assignRef ? ref : null} className="hidden lg:block">
          {/* Memoised to avoid unnecessary re-renders on setting sidebar width  */}
          <MemoisedSideBar />
        </div>
        {children}
      </div>
    )
  );
};

export default PrimaryLayout;
