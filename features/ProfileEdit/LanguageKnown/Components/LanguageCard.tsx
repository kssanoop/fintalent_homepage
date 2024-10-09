import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Pencil as EditIcon } from "lucide-react";
import LanguageAddDialog from "./LanguageAddDialog";
import { ROLES } from "@/types/authorization";

export type Language = {
  name: string;
  proficiency: string;
};

interface LanguageCardProps {
  languages: Language[];
  Interface: string;
}

const LanguageCard = ({ languages, Interface }: LanguageCardProps) => {
  const [openLanguageAdd, setOpenLanguageAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleAddLanguageDialogClick = (event: any) => {
    setOpenLanguageAdd(true);
    setIsEdit(false);
  };
  const handleEditLanguageDialogClick = (event: any) => {
    // setOpenLanguageEdit(true);
    setIsEdit(true);
    setOpenLanguageAdd(true);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xs font-semibold tracking-[1.92px] text-[#171717]">
              LANGUAGES KNOWN
            </CardTitle>
            {Interface === ROLES.CANDIDATE && (
              <EditIcon
                fill="#A9A9A9"
                color="white"
                size={16}
                className="cursor-pointer"
                onClick={handleEditLanguageDialogClick}
              />
            )}
          </div>
          {Interface === ROLES.CANDIDATE && (
            <p
              className="cursor-pointer text-[#3790E3]"
              onClick={handleAddLanguageDialogClick}
            >
              Add new +
            </p>
          )}
        </CardHeader>
        <CardContent>
          {languages?.length > 0 ? (
            <div className="flex gap-5">
              {/* languages */}
              <div className="flex w-[157px] flex-col gap-4">
                <h4 className="text-sm font-medium text-[#5E5E5E]">Language</h4>
                {languages?.map((language) => {
                  return (
                    <p
                      className="text-base font-medium text-black"
                      key={crypto.randomUUID()}
                    >
                      {language?.name}
                    </p>
                  );
                })}
              </div>

              <div className="flex w-[157px] flex-col gap-4">
                <h4 className="text-sm font-medium text-[#5E5E5E]">
                  Proficiency
                </h4>
                {languages.map((language) => {
                  return (
                    <p
                      className="text-base font-medium text-black"
                      key={crypto.randomUUID()}
                    >
                      {language?.proficiency}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#5E5E5E]">No Known Language Added</p>
          )}
        </CardContent>
      </Card>
      <LanguageAddDialog
        open={openLanguageAdd}
        setOpen={setOpenLanguageAdd}
        data={languages}
        isEdit={isEdit}
      />
    </>
  );
};

export default LanguageCard;
