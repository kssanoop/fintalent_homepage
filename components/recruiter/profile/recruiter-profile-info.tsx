import { ChildrenProp } from "@/types/common-types";
import { cn } from "@/utils/cnHelper";
import Link from "next/link";

const RecruiterProfileInfo = ({ children }: ChildrenProp) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const Label = ({ children }: ChildrenProp) => {
  return <p className="text-sm text-brand-grey">{children}</p>;
};

RecruiterProfileInfo.Label = Label;

function ensureHttps(url: string) {
  if (!url.startsWith("https://")) {
    return "https://" + url;
  } else {
    return url; // Already has https, return it as is
  }
}

const Value = ({
  children,
  isLink,
  href,
  className,
}: ChildrenProp & {
  isLink?: boolean;
  href?: string;
  className?: string;
}) => {
  if (isLink && href) {
    return (
      <Link
        href={ensureHttps(href)}
        target="_blank"
        className={cn("font-medium text-brand-blue-light", className)}
      >
        {children}
      </Link>
    );
  }
  return <div className={cn("text-sm font-medium", className)}>{children}</div>;
};

RecruiterProfileInfo.Value = Value;
export default RecruiterProfileInfo;
