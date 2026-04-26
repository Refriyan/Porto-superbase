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
//import ChatRoom from "./components/ChatRoom";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { getProjects } from "./services/project";
import { getCertif } from "./services/certif";
import ChatRoom from "./components/ChatRoom";
import { FaEnvelope, FaInstagram } from "react-icons/fa";

// ..
AOS.init();

function App() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // 🔥 FETCH DATA (SUDAH BERSIH)
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
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HOME ================= */}
        <section
          id="home"
          className="relative  min-h-[100dvh] flex items-center pb-32"
        >
          <div className="hero grid md:grid-cols-2 items-center pt-10 gap-6 w-full overflow-hidden">
            {/* Kiri */}
            <div className="animate__animated animate__fadeInUp animate__delay-3s">
              <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl">
                <img src="./assets/ref.png" className="w-10 rounded-md" loading="lazy" decoding="async" />
                <q>Fatigue is temporary, effort lasts longer.</q>
              </div>

              <h1 className="text-5xl font-bold mb-6">
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

              <div className="flex items-center sm:gap-4 gap-2">
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

            {/* Kanan */}
            <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s w-full md:w-auto flex justify-center md:block mt-6 md:mt-0">
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
              />
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="mt-24 mx-auto w-full max-w-7xl rounded-3xl border-[5px] border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-10"
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
                direction="top"
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

          <div className="flex flex-wrap justify-center gap-6">
            {listTools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-zinc-900 p-4 rounded-xl border border-zinc-700 hover:border-red-500 transition-all duration-300"
              >
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain group-hover:scale-110 transition"
                />

                <p className="text-sm text-center mt-2 opacity-70">
                  {tool.nama}
                </p>
              </div>
            ))}
          </div>
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
                techStack: p.tech_stack,
                image: p.image_url,
                githubUrl: p.github_url,
                liveDemo: p.live_demo,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-purple-500/20 transition-all duration-300"
                data-aos="fade-up"
              >
                {/* IMAGE */}
                {cert.image_url && (
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{cert.title}</h3>

                  <p className="text-sm text-purple-400">
                    {cert.issuer} • {cert.year}
                  </p>

                  {/* ACTION */}
                  {cert.credential_url ? (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-4 py-2 rounded-lg transition"
                    >
                      View Credential ↗
                    </a>
                  ) : (
                    <span className="mt-4 text-xs text-gray-500 italic">
                      No credential link
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
          <h1 className="text-4xl mb-2 font-bold text-center">
            Contact & Chat
          </h1>
          <p className="text-base text-center mb-10 opacity-50">
            Get in touch with me or chat in real-time
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* ===== LEFT: CHAT / INFO ===== */}
            <div className="flex-1 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <ChatRoom />
              <div>
                <h2 className="text-xl font-semibold mb-4">Let's Talk 👋</h2>
                <p className="text-sm text-gray-400 mb-6">
                  Feel free to reach out for collaboration, project, or just say
                  hi.
                </p>

                {/* FAKE CHAT */}
                <div className="space-y-4">
                  <div className="bg-zinc-800 p-3 rounded-lg w-fit max-w-xs">
                    Hi, are you available for a project?
                  </div>

                  <div className="bg-purple-600 p-3 rounded-lg w-fit max-w-xs ml-auto">
                    Yes! Let’s discuss 🚀
                  </div>
                </div>
              </div>

              {/* CONTACT INFO */}
              <div className="flex place-items-center gap-4 mt-4">
                {/* EMAIL */}
                <a
                  href="mailto:refriyanadrianto@gmail.com"
                  title="Send Email"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
                >
                  <FaEnvelope className="text-white text-lg" /> Email
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://instagram.com/refriyan_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
                >
                  <FaInstagram className="text-white text-lg" /> Instagram
                </a>
              </div>
            </div>

            {/* ===== RIGHT: FORM ===== */}
            <div className="flex-1">
              <form
                action="https://formsubmit.co/refriyanadrianto@gmail.com"
                method="POST"
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-lg"
                autoComplete="off"
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Your name..."
                      className="w-full mt-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <input
                      type="email"
                      name="Email"
                      autoComplete="email"
                      placeholder="Your email..."
                      className="w-full mt-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      autoComplete="message"
                      placeholder="Write your message..."
                      className="w-full mt-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-blue-600 hover:opacity-90 transition"
                  >
                    Send Message 🚀
                  </button>
                </div>
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
