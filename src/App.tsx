import {
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import StreamedMessage from "./components/StreamedMessage";
import Messages from "./components/Messages";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

const threadID = uuidv4();
const userID = "311003fb-7932-49f0-ab47-388a4feb4383";
// const apiUrl = "https://gptapi.nextmarket.online";
const apiUrl = "http://localhost:3000";

export interface Message {
  type: string;
  content: string;
}

function App() {
  const [query, setQuery] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const isSendButtonDisabled = !query.trim() || isGenerating;

  const codeBlocks = document.querySelectorAll("pre code");

  codeBlocks.forEach((element) => {
    if (
      element.getAttribute("data-highlighted") !== "yes" &&
      !element.classList.contains("language-undefined")
    ) {
      hljs.highlightElement(element as HTMLElement);
    }
  });

  const parseContent = (event: string) => {
    try {
      const lines = event.split("\r\n");
      const data = lines.find((line: string) => line.startsWith("data: "));

      if (!data) return;

      const dataString = data.replace("data: ", "");

      const json = JSON.parse(dataString);

      const lastMsg = json[json.length - 1];

      if (!lastMsg || lastMsg.type !== "ai") return;

      return lastMsg.content;
    } catch (error) {
      console.error("Error parsing stream:", error);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey == false && !isSendButtonDisabled) {
      e.preventDefault();
      sendPrompt();
    }
  };

  const getMessages = async () => {
    const res = await axios.post(`${apiUrl}/messages`, {
      threadID,
      userID,
    });

    setMessages(res.data.messages);
  };

  const sendPrompt = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    setIsGenerating(true);
    setQuery("");

    try {
      const res = await fetch(`${apiUrl}/query`, {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: query, threadID, userID }),
      });

      await getMessages();

      const stream = res.body;

      if (!stream) return;

      setMessage("");

      const reader = stream.getReader();

      let completeChunk = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const str = new TextDecoder("utf-8").decode(value);

        completeChunk += str;

        if (!completeChunk.endsWith("\r\n\r\n")) continue;

        const content = parseContent(completeChunk);

        if (content) setMessage(content);

        completeChunk = "";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <header className="">
        <div className="p-4 bg-white top-0 w-full border-b border-dark-700/10">
          <div className="flex items-center gap-1 font-medium text-accent">
            <span className="ic text-xl">robot</span>GPT
          </div>
        </div>
      </header>
      <div className="flex flex-col justify-end h-full overflow-hidden mb-[env(safe-area-inset-bottom)]">
        <div className="flex flex-col gap-4 px-6 py-4 overflow-y-auto overflow-x-hidden min-w-0">
          <Messages messages={messages} />
          <StreamedMessage message={message} />
          {isGenerating && (
            <span className="inline-block h-4 w-2 ml-1 bg-black animate-blink ic" />
          )}
          {!message && !messages.length && !isGenerating && (
            <div className="text-gray-500">Start typing message for AI...</div>
          )}
        </div>
        <form className="p-2 pt-0" onSubmit={sendPrompt}>
          <div className="relative flex w-full">
            <TextareaAutosize
              placeholder="Prompt"
              className="resize-none w-full border border-dark-700/10 rounded-lg p-3 pr-20 outline-none"
              value={query}
              onChange={handleTextAreaChange}
              onKeyDown={handleEnterPress}
            />
            <div className="absolute right-0 bottom-0 p-2">
              <button
                className="flex items-center justify-center bg-accent text-white rounded-md mt-auto w-8 h-8 disabled:opacity-50"
                disabled={isSendButtonDisabled}
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-light-500 border-r-transparent rounded-full animate-spin" />
                ) : (
                  <span className="ic font-bold text-lg">chevron_right</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
