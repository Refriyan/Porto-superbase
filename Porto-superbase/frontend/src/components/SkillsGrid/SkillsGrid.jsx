import { useState } from "react"
import { listTools } from "../../data"

const kategoriList = ["Semua", "Frontend", "Backend", "Tools", "Design", "Mobile"]

const kategoriColor = {
  Frontend: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Backend: "from-green-500/20 to-green-600/10 border-green-500/30",
  Tools: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
  Design: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  Mobile: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
}

const kategoriIcon = {
  Semua: "🧰",
  Frontend: "🎨",
  Backend: "⚙️",
  Tools: "🛠️",
  Design: "✏️",
  Mobile: "📱",
}

export default function SkillsGrid() {
  const [active, setActive] = useState("Semua")

  const filtered = active === "Semua"
    ? listTools
    : listTools.filter(t => t.kategori === active)

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {kategoriList.map(k => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              active === k
                ? "bg-white text-black border-white scale-105"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
            }`}
          >
            {kategoriIcon[k]} {k}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filtered.map(tool => (
          <div
            key={tool.id}
            className={`group bg-gradient-to-br ${kategoriColor[tool.kategori] || "from-zinc-800 to-zinc-900 border-zinc-700"} 
            border p-4 rounded-2xl flex flex-col items-center gap-2 
            hover:scale-105 transition-all duration-300 cursor-default`}
          >
            <img
              src={tool.gambar}
              alt={tool.nama}
              loading="lazy"
              decoding="async"
              className="w-10 h-10 object-contain"
            />
            <p className="text-xs text-center font-medium leading-tight">{tool.nama}</p>
            <span className="text-[10px] text-zinc-500">{tool.ket}</span>
          </div>
        ))}
      </div>
    </div>
  )
}