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

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    if (token) {
      fetchProjects();
      fetchCertificates();
    }
  }, [token]);

  // ================= AUTH =================
  const handleLogin = async () => {
    try {
      await login(username, password);
      setToken("logged"); // simple flag
    } catch (err) {
      alert("Login gagal: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

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

  // ================= LOGIN VIEW =================
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-zinc-900 p-10 rounded-xl w-80">
          <h2 className="mb-4">Admin Login</h2>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-2 p-2 bg-zinc-800"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 bg-zinc-800"
          />
          <button onClick={handleLogin} className="w-full bg-red-600 p-2">
            Login
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ================= PROJECT ================= */}
<div className="mb-20">
  {/* HEADER */}
  <div className="mb-6">
    <h2 className="text-3xl font-bold">Projects</h2>
    <p className="text-gray-400 text-sm">
      Kelola project portfolio Anda
    </p>
  </div>

  {/* FORM */}
  <form
    onSubmit={editing ? handleUpdate : handleSubmit}
    className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-purple-500/20 p-6 rounded-2xl mb-8"
  >
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <input
        className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
        placeholder="Tech Stack"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />

      <input
        className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <input
        className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
        placeholder="Live Demo URL"
        value={liveDemo}
        onChange={(e) => setLiveDemo(e.target.value)}
      />

      <textarea
        className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg md:col-span-2"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg mb-4"
    />

    <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
      {editing ? "Update Project" : "+ Add Project"}
    </button>
  </form>

  {/* LIST */}
  <div className="grid md:grid-cols-2 gap-6">
    {projects.map((p) => (
      <div
        key={p.id}
        className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg"
      >
        {/* IMAGE */}
        {p.image_url && (
          <img
            src={p.image_url}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover"
          />
        )}

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{p.title}</h3>

          <p className="text-sm text-purple-400 mb-2">
            {p.tech_stack}
          </p>

          <p className="text-sm text-gray-400 line-clamp-2">
            {p.description}
          </p>

          {/* ACTION */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3 text-sm">
              {p.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  className="text-purple-400 hover:underline"
                >
                  GitHub ↗
                </a>
              )}

              {p.live_demo && (
                <a
                  href={p.live_demo}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Live ↗
                </a>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 px-3 py-1 rounded text-black text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* ================= CERTIFICATE ================= */}
      <div className="mb-20">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Certificates</h2>
          <p className="text-gray-400 text-sm">
            Kelola sertifikat dan pencapaian professional Anda
          </p>
        </div>

        {/* FORM */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-purple-500/20 p-6 rounded-2xl mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <input
              className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
              placeholder="Contoh: Python Programming"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
            />

            <input
              className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
              placeholder="Contoh: Coursera"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />

            <input
              className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
              placeholder="Contoh: 2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <input
              className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
              placeholder="https://credential-url.com"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              onChange={(e) => setCertImage(e.target.files[0])}
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            />
          </div>

          <button
            onClick={editingCert ? handleUpdateCert : handleCreateCert}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
          >
            + Add Certificate
          </button>
        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((c) => (
            <div
              key={c.id}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              {c.image_url && (
                <img
                  src={c.image_url}
                  alt={c.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-purple-400">
                  {c.issuer} • {c.year}
                </p>

                {/* ACTION */}
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={credentialUrl || "#"}
                    target="_blank"
                    className="text-sm text-purple-400 hover:underline"
                  >
                    Lihat Credential ↗
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCert(c)}
                      className="bg-yellow-500 px-3 py-1 rounded text-black text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCert(c.id)}
                      className="bg-red-600 px-3 py-1 rounded text-sm"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
