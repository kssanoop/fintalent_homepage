import { cn } from "@/utils/cnHelper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const CandidateCardContact = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: "phoneNo" | "Email" | "Linkedin";
  value: string;
}) => {
  const href: string = (() => {
    switch (label) {
      case "phoneNo":
        return `tel:${value}`;
      case "Email":
        return `mailto:${value}`;
      default:
        return value;
    }
  })();
  const router = useRouter();
  const pathName = usePathname();
  const { TagId } = router.query;
  const isLinkDisabled = `${pathName}` === `/admin/tags/${String(TagId)}`;
  return (
    <>
      {value ? (
        <Link
          href={isLinkDisabled ? "# " : href}
          target={isLinkDisabled ? undefined : "_blank"}
          className="group flex items-center gap-[2.5px] text-xs font-medium text-[#5E5E5E]"
          onClick={(e) => {
            e.stopPropagation()
            isLinkDisabled && e.preventDefault();
          }}
        >
          {icon}

          <p
            className={cn(
              "",
              label === "Linkedin" && "w-36 truncate group-hover:underline",
            )}
          >
            {value}
          </p>
        </Link>
      ) : null}
    </>
  );
};

export default CandidateCardContact;
