import { useEffect, useRef, useState } from "react";
import { supabase } from "../services/api";

export default function ChatRoom() {
  return <div>Chat Loaded ✅</div>;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [typing, setTyping] = useState(null);
  const bottomRef = useRef();

  // 🔐 LOGIN ANON
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        supabase.auth.signInAnonymously();
      } else {
        setUser(data.user);
      }
    });
  }, []);

  // 📩 FETCH + REALTIME
  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  // ✍️ TYPING INDICATOR
  const handleTyping = (value) => {
    setText(value);

    supabase.channel("typing").send({
      type: "broadcast",
      event: "typing",
      payload: { username: "Someone is typing..." },
    });
  };

  useEffect(() => {
    const channel = supabase
      .channel("typing")
      .on("broadcast", { event: "typing" }, (payload) => {
        setTyping(payload.payload.username);
        setTimeout(() => setTyping(null), 1500);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 📤 SEND MESSAGE
  const handleSend = async () => {
    if (!text.trim()) return;

    await supabase.from("messages").insert([
      {
        user_id: user.id,
        username: "User",
        message: text,
        room: "global",
      },
    ]);

    setText("");
  };

  // 🔽 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg) => {
          const isMe = msg.user_id === user?.id;

          return (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-xs text-sm ${
                isMe
                  ? "bg-purple-600 ml-auto text-white"
                  : "bg-zinc-800"
              }`}
            >
              {!isMe && (
                <span className="text-purple-400 text-xs">
                  {msg.username}
                </span>
              )}
              <p>{msg.message}</p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* TYPING */}
      {typing && (
        <p className="text-xs text-gray-400 mb-2">{typing}</p>
      )}

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="px-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}