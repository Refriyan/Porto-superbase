import React, { useState, useEffect } from "react";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { techIcons } from "../../data";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const githubLink = project.githubUrl || project.github_url || "";
  const liveDemoLink = project.liveDemo || project.live_demo || "";

  const hasGithub = githubLink.trim() !== "";
  const hasLiveDemo = liveDemoLink.trim() !== "";

  const techStack = Array.isArray(project.techStack)
    ? project.techStack
    : project.tech_stack
      ? project.tech_stack.split(",").map((tech) => tech.trim())
      : [];

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center z-50 p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl transform transition-all duration-300 ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-white/10 transition"
        >
          <FiX size={22} />
        </button>

        {/* Hero Image */}
        {project.image && (
          <div className="relative w-full h-52 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-7 md:p-10 flex flex-col gap-5 sm:gap-6">
          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {project.title}
            </h2>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base md:text-lg">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 inline-flex items-center gap-2"
                >
                  {techIcons[tech.trim().toLowerCase()] && (
                    <img
                      src={techIcons[tech.trim().toLowerCase()]}
                      alt={tech}
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            {hasGithub ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all text-sm sm:text-base"
              >
                <FiGithub size={20} />
                <span>Source Code</span>
              </a>
            ) : (
              <button
                disabled
                className="flex-1 inline-flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-800 text-zinc-500 font-semibold cursor-not-allowed text-sm sm:text-base"
              >
                <FiGithub size={20} />
                <span>Source Code</span>
              </button>
            )}

            {hasLiveDemo ? (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all text-sm sm:text-base"
              >
                <FiExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            ) : (
              <button
                disabled
                className="flex-1 inline-flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-800 text-zinc-500 font-semibold cursor-not-allowed text-sm sm:text-base"
              >
                <FiExternalLink size={20} />
                <span>Live Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
          }
        }

        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }

        .animate-modal-out {
          animation: modalOut 0.3s ease-in forwards;
        }

        /* Premium scrollbar */
        .max-h-\\[92vh\\]::-webkit-scrollbar {
          width: 6px;
        }

        .max-h-\\[92vh\\]::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }

        .max-h-\\[92vh\\]::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
