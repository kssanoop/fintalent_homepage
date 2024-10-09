import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

const ReassignAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      <AccordionItem value="item-1" className="border-0 p-0">
        <AccordionTrigger className="rounded-lg border border-border px-3 py-4 hover:no-underline">
          <div className="flex grow items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" className="" />
                <AvatarProfileFallback />
              </Avatar>
              <div className="text-left">
                <p>Aditya J K</p>
                <div className="flex">
                  <p>Manager ID #1234</p>
                  <p className="flex">
                    <Dot color="#5E5E5E" className="" />
                    10 Companies assigned
                  </p>
                </div>
              </div>
            </div>
            <p
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="cursor-pointer p-1.5 text-sm font-bold text-brand-blue"
            >
              Assign +
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mb-[18px] bg-[#034a9a14] pb-0 pt-2.5">
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" className="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-bold">Fincorp</p>
          </div>
          <div></div>
          <div></div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReassignAccordion;
