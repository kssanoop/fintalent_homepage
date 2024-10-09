import { useEffect } from "react";
import { useGetInfoFromCookie } from "./useGetInfoFromCookie";

const responsiveInterface = ["recruiter", "candidate"];

export const useLayoutResponsiveHeight = () => {
  const { role } = useGetInfoFromCookie();
  // NOTE:  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  useEffect(() => {
    if (role && responsiveInterface.includes(role)) {
      const resetHeight = () => {
        // reset the height of the page container element (id = "layout-container") to that of the inner browser
        const layoutContainer = document.getElementById("layout-container");
        if (layoutContainer) {
          layoutContainer.style.height = window.innerHeight + "px";
          // document.body.style.overflowY = "hidden";
        }
      };
      window.addEventListener("resize", resetHeight);
      resetHeight();
      return () => {
        window.removeEventListener("resize", resetHeight);
      };
    }
  }, [role]);
};
