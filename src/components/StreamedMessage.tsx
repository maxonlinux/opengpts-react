import hljs from "highlight.js";
import Markdown from "marked-react";
import { useEffect } from "react";

const StreamedMessage = ({ message }: { message: string }) => {
  if (!message) return;

  return (
    <div className="prose w-full break-words">
      <div className="uppercase text-gray-500 text-xs">AI:</div>
      <Markdown children={message} />
    </div>
  );
};

export default StreamedMessage;
