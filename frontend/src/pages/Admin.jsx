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
import Dashboard from "../components/Dashboard/Dashboard";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
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
    <Dashboard
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      projects={projects}
      certificates={certificates}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleEditCert={handleEditCert}
      handleDeleteCert={handleDeleteCert}
      // 🔥 TAMBAHAN (INI YANG BIKIN CRUD BALIK)
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      tech={tech}
      setTech={setTech}
      githubUrl={githubUrl}
      setGithubUrl={setGithubUrl}
      liveDemo={liveDemo}
      setLiveDemo={setLiveDemo}
      image={image}
      setImage={setImage}
      handleSubmit={handleSubmit}
      handleUpdate={handleUpdate}
      editing={editing}
      // CERT
      certName={certName}
      setCertName={setCertName}
      issuer={issuer}
      setIssuer={setIssuer}
      year={year}
      setYear={setYear}
      credentialUrl={credentialUrl}
      setCredentialUrl={setCredentialUrl}
      certImage={certImage}
      setCertImage={setCertImage}
      handleCreateCert={handleCreateCert}
      handleUpdateCert={handleUpdateCert}
      editingCert={editingCert}
    />
  );
}
