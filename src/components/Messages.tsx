import Markdown from "marked-react";
import { Message } from "../App";
import hljs from "highlight.js";
import { useEffect } from "react";

const Messages = ({ messages }: { messages: Message[] }) => {
  useEffect(() => {
    if (!messages.length) return;

    // hljs.highlightAll();
  }, [messages]);

  if (!messages.length) return;

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, i) => (
        <div className="prose w-full break-words" key={i}>
          <div className="uppercase text-gray-500 text-xs">{msg.type}:</div>
          <Markdown children={msg.content} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
