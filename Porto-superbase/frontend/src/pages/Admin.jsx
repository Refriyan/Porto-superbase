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
import { uploadImage } from "../services/storage";
import { pdfFileToImage } from "../utils/pdfThumbnail";
import { supabase } from "../services/api";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("loginTime");
    navigate("/login", { replace: true });
  };

  // PROJECT STATE
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null);

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
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Gagal fetch projects:", err);
    }
  };

  const fetchCertificates = async () => {
    try {
      const data = await getCertif();
      setCertificates(data);
    } catch (err) {
      console.error("Gagal fetch certificates:", err);
    }
  };

  // Fetch sekali saat mount - tidak duplikat
  useEffect(() => {
    fetchProjects();
    fetchCertificates();
  }, []);
  // ================= PROJECT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

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

  };

  const handleUpdate = async (e) => {
    e.preventDefault();

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

  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus project?")) return;

    await deleteProject(id);
    fetchProjects();
  };

  const handleEdit = (p) => {
    if (!p) { resetForm(); return; }
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset edit state saat pindah tab supaya form tidak stuck di mode edit
    if (tab !== "projects") {
      resetForm();
    }
    if (tab !== "certificates") {
      setEditingCert(null);
      setCertName("");
      setIssuer("");
      setYear("");
      setCredentialUrl("");
      setCertImage(null);
    }
  };

  // ================= CERTIFICATE =================
  // Kalau file yang dipilih PDF, render halaman pertamanya jadi gambar PNG
  // dulu sebelum diupload, supaya tampil sebagai thumbnail seperti gambar biasa.
  const resolveCertUploadFile = async (file) => {
    if (file.type === "application/pdf") {
      const rendered = await pdfFileToImage(file);
      return rendered || file; // fallback ke file asli kalau render gagal
    }
    return file;
  };

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
        const fileToUpload = await resolveCertUploadFile(certImage);
        imagePath = await uploadImage(fileToUpload, "certificates");
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
      setCredentialUrl("");
      setCertImage(null);

      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEditCert = (c) => {
    if (!c) {
      setEditingCert(null);
      setCertName(""); setIssuer(""); setYear(""); setCredentialUrl(""); setCertImage(null);
      return;
    }
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
        const fileToUpload = await resolveCertUploadFile(certImage);
        imagePath = await uploadImage(fileToUpload, "certificates");
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
      setCredentialUrl("");
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
      setActiveTab={handleTabChange}
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