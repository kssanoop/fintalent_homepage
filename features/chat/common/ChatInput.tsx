import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InsertEmojiIcon from "../candidate/components/InsertEmojiIcon";
import { EmojiClickData } from "emoji-picker-react";

export interface ChatInputProps {
  handleSendMessage: (message: string) => void;
}

const ChatInput = ({ handleSendMessage }: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPostion] = useState<number | null>(null);

  useEffect(() => {
    if (inputRef.current != null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inputRef.current.selectionEnd = cursorPosition!;
    }
  }, [cursorPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      // Insert a line break in the message text
      setMessage((prevMessage) => prevMessage + "\n");
      // Prevent the default behavior of Enter key
      e.preventDefault();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      handleInputMessage();
      e.preventDefault();
    }
  };

  const handleInputMessage = () => {
    if (message.trim() !== "") {
      handleSendMessage(message);
      setMessage("");
      setShowEmoji(false);
    }
  };

  const pickEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);
    const { emoji } = emojiData;
    const ref = inputRef.current;
    if (ref?.selectionStart != null && ref?.selectionEnd != null) {
      ref.focus();
      const start = message.substring(0, ref.selectionStart);
      const end = message.substring(ref.selectionStart);
      // const text = start + emoji + end;
      // setMessage(text);
      // setCursorPostion(start.length + emoji.length);
      const updatedMessage = start + emoji + end;
      setMessage(updatedMessage);
      setCursorPostion(updatedMessage.length);
    }
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {Boolean(showEmoji) && <InsertEmojiIcon pickEmoji={pickEmoji} />}
      <div onClick={handleShowEmoji}>
        {showEmoji ? (
          <Smile
            size={25}
            color="#00A9FF"
            strokeWidth={1.5}
            className="cursor-pointer"
          />
        ) : (
          <Smile
            size={25}
            color="#5E5E5E"
            strokeWidth={1.5}
            className="cursor-pointer"
          />
        )}
      </div>
      <Textarea
        ref={inputRef}
        placeholder="Type message here..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ wordWrap: "break-word" }}
        rows={4}
        className="custom-text bottom-0 flex max-h-[42px]
       min-h-[20px] resize-none
        items-center justify-center
         rounded border border-border"
      />
      <div onClick={handleInputMessage}>
        <SendHorizontal
          size={32}
          className="cursor-pointer text-[#5E5E5E] hover:text-[#00A9FF]"
        />
      </div>
    </>
  );
};

export default ChatInput;
