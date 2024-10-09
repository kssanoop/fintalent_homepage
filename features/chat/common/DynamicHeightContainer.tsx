import { cn } from "@/utils/cnHelper";
import React, { useEffect, useRef, ReactNode } from "react";

interface DynamicHeightContainerProps {
  children: ReactNode;
  className?: string;
}

const DynamicHeightContainer: React.FC<DynamicHeightContainerProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setMaxHeight = () => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const contentAboveHeight =
        containerRef.current.getBoundingClientRect().top;
      const maxHeight = windowHeight - contentAboveHeight - 15;
      if (containerRef.current.style) {
        containerRef.current.style.maxHeight = `${maxHeight}px`;
      }
    }
  };

  useEffect(() => {
    setMaxHeight();

    window.addEventListener("resize", setMaxHeight);

    return () => {
      window.removeEventListener("resize", setMaxHeight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("hide-scrollbar flex-grow overflow-y-auto", className)}
    >
      {children}
    </div>
  );
};

export default DynamicHeightContainer;
