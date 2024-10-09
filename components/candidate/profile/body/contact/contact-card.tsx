import Link from "next/link";
import { Contact } from "../profile-left";
import { modifyLink } from "@/components/modify-links/modify-links";

interface ContactCardProps extends Contact {
  isLink?: boolean;
}

const ContactCard = ({ label, value, icon, isLink }: ContactCardProps) => {
  return (
    <>
      {" "}
      <div className="flex min-w-[76px] items-center gap-1.5">
        {icon}
        <p className="text-sm font-normal text-[#5E5E5E]">{label}</p>
      </div>
      {isLink ? (
        <Link
          href={modifyLink(value)}
          target="_blank"
          className="truncate text-sm font-normal text-[#3790E3]"
        >
          {value}
        </Link>
      ) : (
        <div className="flex items-start justify-start">
          <p className="text-sm font-normal text-black">{value}</p>
        </div>
      )}
    </>
  );
};

export default ContactCard;
