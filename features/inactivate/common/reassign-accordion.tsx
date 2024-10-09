import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

const ReassignAccordion = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-3"
      {...props}
    >
      {children}
    </Accordion>
  );
};

const ReassignAccordionItem = ({
  children,
  value,
  ...props
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <AccordionItem value={value} className="border-0 p-0" {...props}>
      {children}
    </AccordionItem>
  );
};

ReassignAccordion.AccordionItem = ReassignAccordionItem;

const ReassignAccordionTrigger = ({ children }: { children: ReactNode }) => {
  return (
    <AccordionTrigger className="rounded-lg border border-border px-3 py-4 hover:no-underline">
      {children}
    </AccordionTrigger>
  );
};

ReassignAccordion.AccordionTrigger = ReassignAccordionTrigger;

const ReassignAccordionContent = ({ children }: { children: ReactNode }) => {
  return (
    <AccordionContent className="mb-[18px] bg-[#034a9a14] pb-0 pt-2.5">
      {children}
    </AccordionContent>
  );
};

ReassignAccordion.AccordionContent = ReassignAccordionContent;

export default ReassignAccordion;
