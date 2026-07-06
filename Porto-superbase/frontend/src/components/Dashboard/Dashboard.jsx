import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { pdfFileToImage } from "@/utils/pdfThumbnail";
import "./Dashboard.css";

export default function Dashboard({
  activeTab,
  setActiveTab,
  handleLogout,
  projects,
  certificates,
  handleEdit,
  handleDelete,
  handleEditCert,
  handleDeleteCert,

  title,
  setTitle,
  description,
  setDescription,
  tech,
  setTech,
  githubUrl,
  setGithubUrl,
  liveDemo,
  setLiveDemo,
  setImage,
  handleSubmit,
  handleUpdate,
  editing,

  certName,
  setCertName,
  issuer,
  setIssuer,
  year,
  setYear,
  credentialUrl,
  setCredentialUrl,
  setCertImage,
  handleCreateCert,
  handleUpdateCert,
  editingCert,
}) {
  const [preview, setPreview] = useState(null);
  const [certPreview, setCertPreview] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [certConverting, setCertConverting] = useState(false);

  // Dipanggil saat user pilih/drop file untuk sertifikat.
  // Kalau filenya PDF, langsung render halaman pertama jadi gambar
  // supaya preview & yang diupload nanti sama-sama berupa gambar.
  const handleCertFileSelected = async (file) => {
    if (!file) return;

    if (file.type === "application/pdf") {
      setCertConverting(true);
      const rendered = await pdfFileToImage(file);
      setCertConverting(false);
      const finalFile = rendered || file; // fallback ke pdf asli kalau gagal render
      setCertImage(finalFile);
      setCertFile(finalFile);
      setCertPreview(URL.createObjectURL(finalFile));
      return;
    }

    setCertImage(file);
    setCertFile(file);
    setCertPreview(URL.createObjectURL(file));
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrop = (e, setFile, setPreview) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Deteksi apakah file/preview sertifikat berupa PDF (bukan gambar).
  // `file` = File object yang baru dipilih (punya .type), `previewUrl` = fallback
  // saat editing data lama yang hanya berupa string URL dari database.
  const isPdfFile = (file, previewUrl) => {
    if (file) return file.type === "application/pdf";
    if (previewUrl) return previewUrl.toLowerCase().split("?")[0].endsWith(".pdf");
    return false;
  };

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setDescription(editing.description || "");
      setTech(editing.tech_stack || "");
      setGithubUrl(editing.github_url || "");
      setLiveDemo(editing.live_demo || "");
      setPreview(editing.image_url || null);
    } else {
      setPreview(null);
    }
  }, [editing, setTitle, setDescription, setTech, setGithubUrl, setLiveDemo]);

  useEffect(() => {
    if (editingCert) {
      setCertName(editingCert.title || "");
      setIssuer(editingCert.issuer || "");
      setYear(editingCert.year || "");
      setCredentialUrl(editingCert.credential_url || "");
      setCertPreview(editingCert.image_url || null);
      setCertFile(null);
    } else {
      setCertPreview(null);
      setCertFile(null);
    }
  }, [editingCert, setCertName, setIssuer, setYear, setCredentialUrl]);

  const navItem = (label, key) => (
    <Button
      onClick={() => setActiveTab(key)}
      className={`w-full justify-start transition rounded-lg px-3 py-2 ${
        activeTab === key
          ? "bg-indigo-600 text-white"
          : "bg-transparent hover:bg-gray-800 text-gray-300"
      }`}
    >
      {label}
    </Button>
  );
  const cardStyle =
    "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300";

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-white">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:relative z-50 top-0 left-0 h-screen
        w-64 min-w-[16rem] flex-shrink-0
        bg-white/5 backdrop-blur-xl border-r border-white/10 p-6
        flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        style={{
          pointerEvents: sidebarOpen ? "auto" : undefined,
        }}
      >
        <div className="flex flex-col h-full">
          {/* TOP */}
          <div>
            <h1 className="text-xl font-semibold mb-10 tracking-tight flex items-center gap-2">
              ⚡
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Admin
              </span>
            </h1>

            <div className="space-y-2">
              {navItem("Overview", "overview")}
              {navItem("Projects", "projects")}
              {navItem("Certificates", "certificates")}
            </div>
          </div>

          {/* BOTTOM (LOGOUT FIX) */}
          <div className="mt-auto">
            <Button
              className="w-full bg-red-500/80 hover:bg-red-600 transition rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* OVERLAY (MOBILE) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* TOPBAR */}
        <div className="h-16 sticky top-0 z-30 backdrop-blur-xl bg-[#020617]/70 border-b border-white/10 flex items-center px-6 md:px-10 justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <h2 className="text-lg font-semibold capitalize tracking-wide">
              {activeTab}
            </h2>
          </div>

          <div className="text-sm text-gray-400">Admin Dashboard</div>
        </div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Projects", value: projects.length },
                  { label: "Certificates", value: certificates.length },
                  { label: "Status", value: "Active" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${cardStyle} p-5 space-y-4`}
                  >
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {item.value}
                    </h2>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-8">

                {/* FORM CARD — full width di atas */}
                <div className={`${cardStyle} p-6`}>
                  <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                    {editing ? "Edit Project" : "Add New Project"}
                  </h2>
                  <form onSubmit={editing ? handleUpdate : handleSubmit}>
                    {/* Row 1: Title + Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    {/* Row 2: Tech + Github + Live Demo */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <Input
                        placeholder="Tech Stack (e.g. React, Node.js)"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="GitHub URL"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="Live Demo URL"
                        value={liveDemo}
                        onChange={(e) => setLiveDemo(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    {/* Row 3: Upload + Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div
                        onDrop={(e) => handleDrop(e, setImage, setPreview)}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById("fileInputProject").click()}
                        className="flex-1 border border-dashed border-white/20 rounded-xl p-4 text-center text-gray-400 hover:border-indigo-500 hover:bg-indigo-500/5 transition cursor-pointer flex items-center justify-center gap-2 min-h-[56px]"
                      >
                        {preview ? (
                          <img src={preview} className="h-12 object-contain rounded-lg" />
                        ) : (
                          <span className="text-sm">📎 Drag & drop or click to upload image</span>
                        )}
                        <input
                          id="fileInputProject"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                          }}
                        />
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl px-6"
                        >
                          {editing ? "Update" : "Add Project"}
                        </Button>
                        {editing && (
                          <Button
                            type="button"
                            className="bg-white/10 hover:bg-white/20 rounded-xl"
                            onClick={() => handleEdit(null)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                {/* LIST — grid di bawah */}
                <div>
                  <p className="text-sm text-gray-400 mb-4">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projects.map((p) => (
                      <motion.div
                        key={p.id}
                        whileHover={{ y: -4 }}
                        className={`${cardStyle} overflow-hidden group`}
                      >
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-white/5 overflow-hidden">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🖥️</div>
                          )}
                          {/* Action buttons overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              className="bg-white text-zinc-900 hover:bg-gray-200 text-xs"
                              onClick={() => handleEdit(p)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-xs"
                              onClick={() => handleDelete(p.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <h3 className="font-semibold text-sm leading-tight mb-1">{p.title}</h3>
                          <p className="text-xs text-gray-400 line-clamp-2 mb-2">{p.description}</p>
                          {p.tech_stack && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {p.tech_stack.split(",").slice(0, 3).map((t) => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                                  {t.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-3">
                            {p.github_url && (
                              <a href={p.github_url} target="_blank" rel="noopener noreferrer"
                                className="text-xs text-gray-400 hover:text-white transition">
                                GitHub →
                              </a>
                            )}
                            {p.live_demo && (
                              <a href={p.live_demo} target="_blank" rel="noopener noreferrer"
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                                Live Demo →
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATES */}
            {activeTab === "certificates" && (
              <div className="space-y-8">

                {/* FORM CARD — full width di atas */}
                <div className={`${cardStyle} p-6`}>
                  <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                    {editingCert ? "Edit Certificate" : "Add New Certificate"}
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editingCert ? handleUpdateCert() : handleCreateCert();
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <Input
                        placeholder="Certificate Name"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="Issuer (e.g. Coursera)"
                        value={issuer}
                        onChange={(e) => setIssuer(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="Year (e.g. 2024)"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <Input
                        placeholder="Credential URL (optional)"
                        value={credentialUrl}
                        onChange={(e) => setCredentialUrl(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Upload area */}
                      <div
                        onDrop={(e) => {
                          e.preventDefault();
                          handleCertFileSelected(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById("fileInputCert").click()}
                        className="flex-1 border border-dashed border-white/20 rounded-xl p-4 text-center text-gray-400 hover:border-indigo-500 hover:bg-indigo-500/5 transition cursor-pointer flex items-center justify-center gap-2 min-h-[56px]"
                      >
                        {certConverting ? (
                          <span className="text-sm animate-pulse">⏳ Converting PDF to image...</span>
                        ) : certPreview ? (
                          isPdfFile(certFile, certPreview) ? (
                            <span className="text-sm flex items-center gap-2">📄 {certFile?.name || "certificate.pdf"}</span>
                          ) : (
                            <img src={certPreview} className="h-12 object-contain rounded-lg" />
                          )
                        ) : (
                          <span className="text-sm">📎 Drag & drop or click to upload image / PDF</span>
                        )}
                        <input
                          id="fileInputCert"
                          type="file"
                          className="hidden"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleCertFileSelected(e.target.files[0])}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 shrink-0">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl px-6"
                        >
                          {editingCert ? "Update" : "Add Certificate"}
                        </Button>
                        {editingCert && (
                          <Button
                            type="button"
                            className="bg-white/10 hover:bg-white/20 rounded-xl"
                            onClick={() => handleEditCert(null)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                {/* LIST — grid di bawah */}
                <div>
                  <p className="text-sm text-gray-400 mb-4">{certificates.length} certificate{certificates.length !== 1 ? "s" : ""}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {certificates.map((c) => (
                      <motion.div
                        key={c.id}
                        whileHover={{ y: -4 }}
                        className={`${cardStyle} overflow-hidden group`}
                      >
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-white/5 overflow-hidden">
                          {c.image_url ? (
                            isPdfFile(null, c.image_url) ? (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300">
                                <span className="text-4xl">📄</span>
                                <span className="text-xs opacity-70">PDF</span>
                              </div>
                            ) : (
                              <img
                                src={c.image_url}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🏆</div>
                          )}
                          {/* Action buttons overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              className="bg-white text-zinc-900 hover:bg-gray-200 text-xs"
                              onClick={() => handleEditCert(c)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-xs"
                              onClick={() => handleDeleteCert(c.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">{c.title}</h3>
                          <p className="text-xs text-gray-400">{c.issuer} • {c.year}</p>
                          {c.credential_url && (
                            <a
                              href={c.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block"
                            >
                              View credential →
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}