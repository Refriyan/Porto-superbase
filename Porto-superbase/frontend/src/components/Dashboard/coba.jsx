import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project";
import { useNavigate } from "react-router-dom";
import {
  getCertif,
  createCertif,
  deleteCertif,
  updateCertif,
} from "../services/certif";
import { login } from "../services/auth";
import { uploadImage } from "../services/storage";
import { supabase } from "../services/api";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("lastActivity");
    navigate("/login", { replace: true });
  };

  const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 menit
  // PROJECT STATE
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // CERTIFICATE STATE
  const [certificates, setCertificates] = useState([]);
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [certImage, setCertImage] = useState(null);
  const [editingCert, setEditingCert] = useState(null);

  // ================= FETCH =================
  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const fetchCertificates = async () => {
    const data = await getCertif();
    setCertificates(data);
  };

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    getCertif().then(setCertificates);
  }, []);
  // ================= PROJECT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = null;

      if (image) {
        imagePath = await uploadImage(image);
      }

      await createProject({
        title,
        description,
        tech_stack: tech,
        github_url: githubUrl,
        live_demo: liveDemo,
        image_url: imagePath,
      });

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Gagal upload");
    }

    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = editing.image_url;

      if (image) {
        imagePath = await uploadImage(image);
      }

      await updateProject(editing.id, {
        title,
        description,
        tech_stack: tech,
        github_url: githubUrl,
        live_demo: liveDemo,
        image_url: imagePath,
      });

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Gagal update");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus project?")) return;

    await deleteProject(id);
    fetchProjects();
  };

  const handleEdit = (p) => {
    setEditing(p);
    setTitle(p.title);
    setDescription(p.description);
    setTech(p.tech_stack);
    setGithubUrl(p.github_url || "");
    setLiveDemo(p.live_demo || "");
    setImage(null);
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setTech("");
    setGithubUrl("");
    setLiveDemo("");
    setImage(null);
  };

  // ================= CERTIFICATE =================
  const handleCreateCert = async () => {
    try {
      if (!certName || !issuer) {
        alert("Nama dan issuer wajib diisi");
        return;
      }

      if (!year || isNaN(Number(year))) {
        alert("Year tidak valid");
        return;
      }

      let imagePath = null;

      if (certImage) {
        imagePath = await uploadImage(certImage);
      }

      await createCertif({
        title: certName,
        issuer,
        year: Number(year),
        image_url: imagePath,
        credential_url: credentialUrl,
      });

      // reset
      setCertName("");
      setIssuer("");
      setYear("");
      setCertImage(null);

      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEditCert = (c) => {
    setEditingCert(c);
    setCertName(c.title);
    setIssuer(c.issuer);
    setYear(c.year);
    setCredentialUrl(c.credential_url || "");
    setCertImage(null);
  };

  const handleUpdateCert = async () => {
    try {
      let imagePath = editingCert.image_url;

      if (certImage) {
        imagePath = await uploadImage(certImage);
      }

      await updateCertif(editingCert.id, {
        title: certName,
        issuer,
        year: Number(year),
        image_url: imagePath,
        credential_url: credentialUrl,
      });

      setEditingCert(null);
      setCertName("");
      setIssuer("");
      setYear("");
      setCertImage(null);

      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleDeleteCert = async (id) => {
    if (!confirm("Hapus certificate?")) return;

    await deleteCertif(id);
    fetchCertificates();
  };

  // ================= MAIN =================
  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold mb-10">🚀 My Admin</h1>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                : "hover:bg-white/10"
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`w-full text-left px-4 py-3 rounded-xl transition ${
              activeTab === "certificates"
                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                : "hover:bg-white/10"
            }`}
          >
            Certificates
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 py-2 rounded-xl"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        {/* ================= PROJECT ================= */}
        {activeTab === "projects" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-400 text-sm">
                Kelola semua project portfolio Anda
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* FORM */}
              <form
                onSubmit={editing ? handleUpdate : handleSubmit}
                className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-fit sticky top-10"
              >
                <div className="space-y-4">
                  <input
                    className="input"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Tech Stack"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="GitHub URL"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Live Demo URL"
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                  />

                  <textarea
                    className="input"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  <button className="btn-primary w-full">
                    {editing ? "Update Project" : "+ Add Project"}
                  </button>
                </div>
              </form>

              {/* LIST */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition"
                  >
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        className="h-40 w-full object-cover group-hover:scale-105 transition"
                      />
                    )}

                    <div className="p-4">
                      <h3 className="font-semibold">{p.title}</h3>

                      <p className="text-purple-400 text-xs mt-1">
                        {p.tech_stack}
                      </p>

                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex justify-between mt-4 text-xs">
                        <div className="flex gap-3">
                          {p.github_url && <a href={p.github_url}>GitHub</a>}
                          {p.live_demo && <a href={p.live_demo}>Live</a>}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-yellow-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ================= CERT ================= */}
        {activeTab === "certificates" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Certificates</h1>
              <p className="text-gray-400 text-sm">Kelola sertifikat Anda</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* FORM */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-fit">
                <div className="space-y-4">
                  <input
                    className="input"
                    placeholder="Name"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Issuer"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="URL"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                  />

                  <input
                    type="file"
                    onChange={(e) => setCertImage(e.target.files[0])}
                  />

                  <button
                    onClick={editingCert ? handleUpdateCert : handleCreateCert}
                    className="btn-primary w-full"
                  >
                    + Add Certificate
                  </button>
                </div>
              </div>

              {/* LIST */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {certificates.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {c.image_url && (
                      <img
                        src={c.image_url}
                        className="h-40 w-full object-cover"
                      />
                    )}

                    <div className="p-4">
                      <h3>{c.title}</h3>

                      <p className="text-purple-400 text-xs">
                        {c.issuer} • {c.year}
                      </p>

                      <div className="flex justify-between mt-4 text-xs">
                        <a href={c.credential_url || "#"}>View</a>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCert(c)}
                            className="text-yellow-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCert(c.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
