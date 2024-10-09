import ContactCard from "./contact-card";
import { Contact } from "../profile-left";

export interface ContactListProps {
  contactList: Contact[];
  isBlur?: boolean;
}

const ContactList = ({ contactList, isBlur = false }: ContactListProps) => {
  return (
    <>
      {contactList.map(({ label, value, icon }) => (
        <div
          key={crypto.randomUUID()}
          className={`flex gap-x-6 gap-y-3.5 ${
            isBlur && "pointer-events-none blur-[2px]"
          }`}
        >
          <ContactCard
            label={label}
            value={value}
            icon={icon}
            isLink={label === "Linkedin"}
          />
        </div>
      ))}
    </>
  );
};

export default ContactList;
