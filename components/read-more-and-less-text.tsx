import _ from "lodash";
import { useState } from "react";

const TRUNCATE_LENGTH = 400;
const ReadMoreAndLessText = ({ text }: { text: string }) => {
  const [isViewAll, setIsViewAll] = useState(false);

  if (text.length > TRUNCATE_LENGTH) {
    return (
      <>
        {isViewAll ? (
          <>
            {text}{" "}
            <span
              onClick={() => {
                setIsViewAll(false);
              }}
              className="cursor-pointer text-sm font-semibold text-brand-black"
            >
              Read less
            </span>
          </>
        ) : (
          <>
            {_.truncate(text, { length: TRUNCATE_LENGTH })}{" "}
            <span
              onClick={() => {
                setIsViewAll(true);
              }}
              className="cursor-pointer text-sm font-semibold text-brand-black"
            >
              Read more
            </span>
          </>
        )}
      </>
    );
  }
  return <>{text}</>;
};

export default ReadMoreAndLessText;
