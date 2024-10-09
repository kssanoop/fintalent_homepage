import { cn } from "@/utils/cnHelper";
import React, { useEffect, useRef, ReactNode } from "react";

interface DynamicWidthContainerProps {
  children: ReactNode;
  className?: string;
}

const DynamicWidthContainer: React.FC<DynamicWidthContainerProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setMaxWidth = () => {
    if (containerRef.current) {
      const windowWidth = window.innerWidth;
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxWidth = windowWidth - containerRect.left - 1;
      if (containerRef.current.style) {
        containerRef.current.style.maxWidth = `${maxWidth}px`;
      }
    }
  };

  useEffect(() => {
    setMaxWidth();

    window.addEventListener("resize", setMaxWidth);

    return () => {
      window.removeEventListener("resize", setMaxWidth);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("flex-grow overflow-x-auto", className)}
    >
      {children}
    </div>
  );
};

export default DynamicWidthContainer;
