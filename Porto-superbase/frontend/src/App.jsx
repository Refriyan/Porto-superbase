import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { getProjects } from "./services/project";
import { getCertif } from "./services/certif";
import ChatBot from "./components/ChatBot";
import { FaEnvelope, FaInstagram } from "react-icons/fa";
import SkillsGrid from "./components/SkillsGrid/SkillsGrid";
import CertifFolder from "./components/CertifFolder/CertifFolder";

// ..
function App() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // SEO: Set dynamic title & meta
  useEffect(() => {
    document.title = "Refriyan Adrianto — Web Developer & IT Pekanbaru | Portofolio";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", "Refriyan Adrianto, Web Developer & IT profesional dari Pekanbaru, Riau. Ahli React, Next.js, Node.js, Python, dan Machine Learning.");
    }
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // 🔥 FETCH DATA (SUDAH BERSIH)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true, // WAJIB (biar gak animasi ulang terus)
      offset: 80,
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjects();
        const certData = await getCertif();

        // console.log("PROJECT:", projectData);
        // console.log("CERT:", certData);

        setProjects(projectData);
        setCertificates(certData);
      } catch (error) {
        console.error("FETCH ERROR:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background Aurora */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <Aurora />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HOME ================= */}
        <section
          id="home"
          className="relative min-h-[100dvh] flex items-center pt-20 pb-32 overflow-visible"
        >
          <div className="hero grid md:grid-cols-2 items-center pt-10 gap-10 md:gap-6 w-full">
            {/* Kiri */}
            <div className="animate__animated animate__fadeInUp animate__delay-3s">
              <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl">
                <img
                  src="./assets/ref.png"
                  className="w-10 rounded-md"
                  loading="lazy"
                  decoding="async"
                />
                <q>Fatigue is temporary, effort lasts longer.</q>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <ShinyText
                  text="Hi I'm Refriyan Adrianto"
                  disabled={false}
                  speed={3}
                />
              </h1>

              <BlurText
                text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
                delay={150}
                animateBy="words"
                direction="top"
                className="mb-6"
              />

              <div className="flex items-center sm:gap-4 gap-2 flex-wrap">
                <a
                  href="./assets/CV.pdf"
                  download
                  className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
                >
                  <ShinyText text="Download CV" speed={3} />
                </a>

                <a
                  href="#project"
                  className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
                >
                  <ShinyText text="Explore My Projects" speed={3} />
                </a>
              </div>
            </div>

            {/* Kanan — ProfileCard */}
            <div className="flex justify-center md:justify-end animate__animated animate__fadeInUp animate__delay-4s w-full mt-4 md:mt-0 md:pl-8">
              <div className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-none md:w-fit mx-auto md:mx-0 md:mr-0">
                <ProfileCard
                  name="Refriyan Adrianto"
                  title="Web Developer"
                  handle="refriyan_"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="./assets/ref.png"
                  showUserInfo
                  enableTilt
                  enableMobileTilt={false}
                  showBehindGradient={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="mt-24 mx-auto w-full max-w-7xl rounded-3xl border-[5px] border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-5 sm:p-10"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            {/* ===== LEFT TEXT + LOGO ===== */}
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6 text-white">About Me</h2>

              <BlurText
                text="I’m Refriyan Adrianto,A Bachelor of Informatics (S.Kom) graduate from Institut Teknologi Nasional Bandung with expertise in web development and a strong foundation in machine learning. Developed a classification system for oil palm fruit ripeness using the Weighted Naive Bayes method to address imbalanced data challenges."
                delay={150}
                animateBy="words"
                direction="middle"
                className="text-lg leading-relaxed text-gray-300"
              />
            </div>

            {/* GARIS TENGAH (FIX POSISI) */}
            <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-red-500/20"></div>

            {/* ===== RIGHT VISUAL ===== */}
            <div className="flex justify-center">
              <Lanyard position={[0, 0, 12]} gravity={[0, -30, 0]} />
            </div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-white/10 my-20"></div>

        {/* ================= SKILLS ================= */}
        <section className="mt-20" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center mb-10">My Skills</h2>
          <SkillsGrid />
        </section>

        {/* Proyek */}
        <div
          className="proyek mt-32 py-10"
          id="project"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        ></div>

        <h1
          className="text-center text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Project
        </h1>

        <p
          className="text-base/loose text-center opacity-50"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Showcasing a selection of projects that reflect my skills, creativity,
          and passion for building meaningful digital experiences.
        </p>

        <div className="proyek-box mt-14">
          <div
            style={{ height: "auto", position: "relative" }}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <ChromaGrid
              items={projects.map((p) => ({
                ...p,
                title: p.title,
                subtitle: p.description,
                techStack: p.tech_stack
                  ? p.tech_stack.split(",").map((t) => t.trim())
                  : [],
                image: p.image_url,
                githubUrl: p.github_url || "",
                liveDemo: p.live_demo || "",
              }))}
              onItemClick={handleProjectClick}
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}

        {/* ================= CERTIFICATE ================= */}
        <div
          className="mt-32"
          id="certificate"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <h1 className="text-center text-4xl font-bold mb-2">Certificates</h1>
          <p className="text-base/loose text-center opacity-50 mb-14">
            My certifications and achievements
          </p>
          <CertifFolder certificates={certificates} />
        </div>

        {/* ================= CONTACT ================= */}
        <div className="kontak mt-32 px-0" id="contact" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              Get Ready To Create<br className="hidden sm:block" /> Something Great
            </h1>
            <p className="text-base text-white/40 max-w-md mx-auto">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

            {/* ===== LEFT: Info + Chat ===== */}
            <div className="flex flex-col gap-6">

              {/* Info Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6 text-white">Let's Connect</h2>
                <div className="flex flex-col gap-4">
                  <a href="mailto:refriyanadrianto@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 group-hover:bg-yellow-400/20 transition-all">
                      <FaEnvelope className="text-yellow-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Email</p>
                      <p className="text-sm text-white font-medium break-all">refriyanadrianto@gmail.com</p>
                    </div>
                  </a>

                  <a href="https://instagram.com/refriyan_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-all">
                      <FaInstagram className="text-pink-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Instagram</p>
                      <p className="text-sm text-white font-medium">@refriyan_</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <svg className="text-blue-400 w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Location</p>
                      <p className="text-sm text-white font-medium">Pekanbaru, Riau, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Card */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col min-h-[320px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span className="text-xs text-white/50 font-medium">AI Assistant — Powered by Claude</span>
                </div>
                <div className="flex-1">
                  <ChatBot />
                </div>
              </div>
            </div>

            {/* ===== RIGHT: Form ===== */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm h-fit">
              <h2 className="text-xl font-bold mb-2 text-white">Send a Message</h2>
              <p className="text-sm text-white/40 mb-7">I'll get back to you within 24 hours.</p>

              <form
                action="https://formsubmit.co/refriyanadrianto@gmail.com"
                method="POST"
                autoComplete="off"
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New message from Portfolio!" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input type="text" name="Name" placeholder="Md Jasim Islam"
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition"
                      required />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Email</label>
                    <input type="email" name="Email" placeholder="Your Email"
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition"
                      required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <input type="tel" name="Phone" placeholder="Phone Number"
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Subject</label>
                    <input type="text" name="Subject" placeholder="Subject"
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Message</label>
                  <textarea name="message" rows="5" placeholder="Your Message"
                    className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition resize-none"
                    required />
                </div>

                <button type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase bg-yellow-400 hover:bg-yellow-300 text-zinc-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-400/20">
                  Submit Now →
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;