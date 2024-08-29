import { cn } from "@/lib/utils";

type BubbleProps = {
  message: string;
  isUser: boolean;
};
export const ChatBubble = ({ message, isUser }: BubbleProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-4 max-w-xs mb-4",
        isUser ? "bg-black text-white ml-auto" : "bg-white text-black mr-auto"
      )}
    >
      {message}
    </div>
  );
};
