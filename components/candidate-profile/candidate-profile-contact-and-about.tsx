import { Linkedin, Mail, Phone } from "lucide-react";
import ContactList from "@/components/candidate/profile/body/contact/contact-list";
import { ReactElement } from "react";

export interface Contact {
  label: "Phone" | "Email" | "Linkedin";
  value: string;
  icon: ReactElement;
}

const ContactAndAbout = ({ ...props }) => {
  const contactList: Contact[] = [
    {
      label: "Phone",
      value: props.data.phoneNo,
      icon: <Phone size={16} color="#012A59" />,
    },
    {
      label: "Email",
      value: props.data.email,
      icon: <Mail size={16} color="#012A59" />,
    },
    {
      label: "Linkedin",
      value: props.data.linkedInProfile ?? "",
      icon: <Linkedin size={16} color="#012A59" />,
    },
  ];
  return (
    <>
      <div className="mb-3 flex flex-col gap-[13.5px] border-y border-border py-4 pr-5">
        <ContactList contactList={contactList} />
      </div>
      <div className="flex grow flex-col">
        <h3 className="mb-2 text-sm font-normal text-[#5E5E5E]">About</h3>
        <p className="text-base font-normal text-black">{props.data.summary}</p>
      </div>
    </>
  );
};

export default ContactAndAbout;
