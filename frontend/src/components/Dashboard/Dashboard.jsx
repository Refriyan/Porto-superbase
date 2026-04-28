import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleDrop = (e, setFile, setPreview) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white/10 rounded-lg h-40 w-full" />
  );

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setDescription(editing.description || "");
      setTech(editing.tech_stack || "");
      setGithubUrl(editing.github_url || "");
      setLiveDemo(editing.live_demo || "");
      setPreview(editing.image_url || null);
    }
  }, [editing, setTitle, setDescription, setTech, setGithubUrl, setLiveDemo]);

  useEffect(() => {
    if (editingCert) {
      setCertName(editingCert.title || "");
      setIssuer(editingCert.issuer || "");
      setYear(editingCert.year || "");
      setCredentialUrl(editingCert.credential_url || "");
      setCertPreview(editingCert.image_url || null);
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

  const glass = "bg-white/5 backdrop-blur-xl border border-white/10";

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
                  <div key={i} className={`${cardStyle} p-6`}>
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
              <div className="grid lg:grid-cols-3 gap-6">
                {/* FORM */}
                <div className={`${cardStyle} p-5 space-y-4`}>
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    placeholder="Tech Stack"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                  />
                  <Input
                    placeholder="Github URL"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                  <Input
                    placeholder="Live Demo"
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                  />

                  <div
                    onDrop={(e) => handleDrop(e, setImage, setPreview)}
                    onDragOver={(e) => e.preventDefault()}
                    className="border border-dashed border-white/20 rounded-xl p-6 text-center text-gray-400 hover:border-indigo-500 transition cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileInputProject").click()
                    }
                  >
                    Drag & drop or click
                    <input
                      id="fileInputProject"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }}
                    />
                  </div>

                  {preview && (
                    <img
                      src={preview}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  )}

                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl">
                    {editing ? "Update Project" : "Create Project"}
                  </Button>
                </div>

                {/* LIST */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-5">
                  {projects.map((p) => (
                    <motion.div
                      key={p.id}
                      whileHover={{ y: -5 }}
                      className={`${cardStyle} p-4`}
                    >
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          className="w-full h-36 object-cover rounded-xl mb-3"
                        />
                      )}

                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleEdit(p)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFICATES */}
            {activeTab === "certificates" && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* FORM */}
                <div className={`${cardStyle} p-5 space-y-4`}>
                  <Input
                    placeholder="Name"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                  />
                  <Input
                    placeholder="Issuer"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                  <Input
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <Input
                    placeholder="Credential URL"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                  />

                  <div
                    onDrop={(e) => handleDrop(e, setCertImage, setCertPreview)}
                    onDragOver={(e) => e.preventDefault()}
                    className="border border-dashed border-white/20 rounded-xl p-6 text-center text-gray-400 hover:border-indigo-500 transition cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileInputCert").click()
                    }
                  >
                    Drag & drop or click
                    <input
                      id="fileInputCert"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setCertImage(file);
                        setCertPreview(URL.createObjectURL(file));
                      }}
                    />
                  </div>

                  {certPreview && (
                    <img
                      src={certPreview}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  )}

                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl">
                    {editingCert ? "Update Certificate" : "Create Certificate"}
                  </Button>
                </div>

                {/* LIST */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-5">
                  {certificates.map((c) => (
                    <motion.div
                      key={c.id}
                      whileHover={{ y: -5 }}
                      className={`${cardStyle} p-4`}
                    >
                      {c.image_url && (
                        <img
                          src={c.image_url}
                          className="w-full h-36 object-cover rounded-xl mb-3"
                        />
                      )}

                      <h3 className="font-semibold">{c.title}</h3>
                      <p className="text-sm text-gray-400">
                        {c.issuer} • {c.year}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleEditCert(c)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDeleteCert(c.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
