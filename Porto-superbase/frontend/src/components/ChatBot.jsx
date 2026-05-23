import { useRef, useState } from "react";

// ═══════════════════════════════════════════
// DATA PRIBADI REFRIYAN — edit sesuai kebutuhan
// ═══════════════════════════════════════════
const BOT_NAME = "Ref AI";
const AVATAR = "✨";

const KB = [
  {
    keys: ["nama", "siapa", "kamu", "who", "name"],
    answer: "Halo! Saya Refriyan Adrianto 👋 — seorang Web Developer dari Pekanbaru, Riau, Indonesia.",
  },
  {
    keys: ["pendidikan", "kuliah", "kampus", "jurusan", "lulusan", "degree", "education", "university"],
    answer: "Saya lulusan S.Kom (Sarjana Komputer) dari Institut Teknologi Nasional Bandung 🎓",
  },
  {
    keys: ["skill", "teknologi", "tech", "keahlian", "bisa", "stack", "framework", "bahasa"],
    answer: "Tech stack saya: React, Next.js, Node.js, Python, Kotlin (Android), Tailwind CSS, Supabase, dan Machine Learning 💻",
  },
  {
    keys: ["project", "proyek", "portofolio", "portfolio", "kerja", "work", "karya"],
    answer: "Bisa lihat semua project saya di section Project di atas 👆 — tinggal scroll! Ada berbagai project web dan mobile.",
  },
  {
    keys: ["machine learning", "ml", "ai", "skripsi", "penelitian", "research", "thesis"],
    answer: "Penelitian saya fokus pada klasifikasi kematangan buah kelapa sawit menggunakan metode Weighted Naive Bayes untuk mengatasi data tidak seimbang 🌴",
  },
  {
    keys: ["hire", "rekrut", "kerja sama", "freelance", "collab", "collaboration", "available", "tersedia", "open"],
    answer: "Ya, saya tersedia untuk freelance, kolaborasi, maupun full-time! Hubungi saya via email: refriyanadrianto@gmail.com 📩",
  },
  {
    keys: ["email", "kontak", "contact", "hubungi", "reach"],
    answer: "Email saya: refriyanadrianto@gmail.com — atau DM via Instagram @refriyan_ 📬",
  },
  {
    keys: ["instagram", "ig", "sosmed", "social"],
    answer: "Follow saya di Instagram: @refriyan_ 📸",
  },
  {
    keys: ["github", "code", "kode", "repo", "repository"],
    answer: "GitHub saya: github.com/refriyan — silakan lihat source code project saya di sana 🐙",
  },
  {
    keys: ["lokasi", "tinggal", "domisili", "location", "where", "pekanbaru", "riau"],
    answer: "Saya berbasis di Pekanbaru, Riau, Indonesia 📍",
  },
  {
    keys: ["sertifikat", "certificate", "sertifikasi", "achievement"],
    answer: "Sertifikat dan pencapaian saya bisa dilihat di section Certificates di halaman ini 🏆",
  },
  {
    keys: ["harga", "rate", "biaya", "price", "cost", "tarif"],
    answer: "Untuk info harga project, silakan hubungi saya langsung via email: refriyanadrianto@gmail.com — saya akan kirim penawaran sesuai kebutuhan 💬",
  },
  {
    keys: ["web", "website", "aplikasi", "app", "mobile", "android"],
    answer: "Saya bisa bantu buat website (React/Next.js) maupun aplikasi mobile Android (Kotlin). Yuk diskusi dulu! 🚀",
  },
  {
    keys: ["pengalaman", "experience", "lama", "berapa tahun"],
    answer: "Saya sudah aktif di dunia web & mobile development sejak kuliah, dengan pengalaman membangun berbagai project nyata 💼",
  },
  {
    keys: ["bandung", "itenas", "kuliah di"],
    answer: "Iya, saya kuliah di Institut Teknologi Nasional (ITENAS) Bandung, ambil jurusan Informatika 🏫",
  },
];

const QUICK_REPLIES = [
  "Siapa Refriyan?",
  "Tech stack-nya apa?",
  "Bisa di-hire?",
  "Cara kontak?",
];

function getReply(text) {
  const lower = text.toLowerCase();
  for (const item of KB) {
    if (item.keys.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return "Hmm, saya belum punya info soal itu 😅 Untuk pertanyaan lebih lanjut, langsung hubungi Refriyan via email: refriyanadrianto@gmail.com ya!";
}

const WELCOME = {
  from: "bot",
  text: "Halo! 👋 Saya Ref AI, asisten pribadi Refriyan. Mau tanya apa tentang dia?",
};

export default function ChatBot() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  const scrollDown = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const next = [...messages, { from: "user", text: msg }];
    setMessages(next);
    setTyping(true);
    scrollDown();

    // Simulasi delay bot biar terasa natural
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getReply(msg) }]);
      setTyping(false);
      scrollDown();
    }, 600 + Math.random() * 400);
  };

  const isFirst = messages.length === 1;

  return (
    <div className="flex flex-col h-full">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 max-h-[260px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.from === "bot" && (
              <div className="w-7 h-7 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                {AVATAR}
              </div>
            )}
            <div className={`px-3.5 py-2.5 rounded-2xl text-sm max-w-[82%] leading-relaxed ${
              m.from === "user"
                ? "bg-yellow-400 text-zinc-900 font-medium rounded-br-sm"
                : "bg-white/10 text-white rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing bubble */}
        {typing && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center shrink-0 text-xs">{AVATAR}</div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/10 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK REPLIES */}
      {isFirst && (
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_REPLIES.map((q) => (
            <button key={q} onClick={() => send(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:text-yellow-300 transition-all">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Tanya tentang Refriyan..."
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition"
        />
        <button onClick={() => send()} disabled={!input.trim()}
          className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          →
        </button>
      </div>
    </div>
  );
}
