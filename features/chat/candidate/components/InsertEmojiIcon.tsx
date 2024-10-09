import React from "react";

import Picker from "emoji-picker-react";
interface Props {
  pickEmoji: any;
}

const InsertEmojiIcon = ({ pickEmoji }: Props) => {
  return (
    <div className="absolute bottom-20 left-1 md:left-3">
      <Picker
        width={"300px"}
        onEmojiClick={pickEmoji}
        skinTonesDisabled={true}
        autoFocusSearch={false}
      />
    </div>
  );
};

export default InsertEmojiIcon;
