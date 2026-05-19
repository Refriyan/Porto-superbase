import { useState } from "react";
import "./CertifFolder.css";

export default function CertifFolder({ certificates }) {
  const [openFolder, setOpenFolder] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Kelompokkan berdasarkan issuer
  const grouped = certificates.reduce((acc, cert) => {
    const key = cert.issuer || "Lainnya";
    if (!acc[key]) acc[key] = [];
    acc[key].push(cert);
    return acc;
  }, {});

  const folders = Object.entries(grouped);

  const folderColors = [
    "from-yellow-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-red-500 to-rose-500",
    "from-indigo-500 to-violet-500",
  ];

  return (
    <div>
      {/* FOLDER VIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {folders.map(([issuer, certs], idx) => (
          <button
            key={issuer}
            onClick={() => setOpenFolder(openFolder === issuer ? null : issuer)}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Folder Icon */}
            <div className={`folder ${openFolder === issuer ? "open" : ""}`}>
              <div className="folder__back">
                {/* Papers */}
                {certs.slice(0, 3).map((cert, i) => (
                  <div key={i} className="paper">
                    {cert.image_url && (
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                ))}

                {/* Front */}
                <div className="folder__front"></div>
              </div>
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-center leading-tight">
              {issuer}
            </p>
            <p className="text-xs text-zinc-500">
              {certs.length} certificate{certs.length > 1 ? "s" : ""}
            </p>
          </button>
        ))}
      </div>

      {/* OPEN FOLDER - Certificate list */}
      {openFolder && (
        <div className="mt-10 bg-zinc-900/80 border border-zinc-700 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">📂 {openFolder}</h3>
            <button
              onClick={() => setOpenFolder(null)}
              className="text-zinc-400 hover:text-white text-sm px-3 py-1 rounded-lg hover:bg-zinc-800 transition"
            >
              ✕ Tutup
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[openFolder].map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:scale-[1.02] hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
              >
                {cert.image_url && (
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="text-sm font-semibold line-clamp-2">
                    {cert.title}
                  </p>
                  <p className="text-xs text-purple-400 mt-1">
                    {cert.issuer} • {cert.year}
                  </p>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-blue-400 hover:underline"
                    >
                      View Credential ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL detail certificate */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md overflow-hidden"
          >
            {selectedCert.image_url && (
              <img
                src={selectedCert.image_url}
                alt={selectedCert.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{selectedCert.title}</h3>
              <p className="text-purple-400 text-sm mb-4">
                {selectedCert.issuer} • {selectedCert.year}
              </p>
              <div className="flex gap-3">
                {selectedCert.credential_url && (
                  <a
                    href={selectedCert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-semibold transition"
                  >
                    View Credential ↗
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl text-sm font-semibold transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
