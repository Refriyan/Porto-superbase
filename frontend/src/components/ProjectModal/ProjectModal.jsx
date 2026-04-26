import React, { useState, useEffect } from "react";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 🔧 ambil link fleksibel dari backend
  const githubLink = project?.githubUrl || project?.github || "";
  const liveDemoLink = project?.live_demo || project?.liveDemo || "";

  const hasGithub = githubLink.trim() !== "";
  const hasLiveDemo = liveDemoLink.trim() !== "";
  console.log("PROJECT MODAL:", project);

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 ${
          isClosing ? "animate-out" : "animate-in"
        }`}
      >
        {project?.image && (
          <img
            src={project.image}
            alt={project?.title}
            loading="lazy"
            decoding="async"
            className="w-full h-56 object-cover rounded-t-2xl"
          />
        )}

        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white">{project?.title}</h2>
            <button
              onClick={handleClose}
              className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {project?.techStack && (
            <p className="text-violet-400 text-sm">{project.techStack}</p>
          )}

          <p className="text-zinc-300 text-base leading-relaxed">
            {project?.description || project?.fullDescription}
          </p>

          <div className="flex gap-3 mt-2">
            {hasGithub ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // 🔥 FIX DI SINI
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 p-3 rounded-full hover:bg-violet-700 transition-colors"
              >
                <FiGithub />
                <span>Source Code</span>
              </a>
            ) : (
              <button
                disabled
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-zinc-700 p-3 rounded-full cursor-not-allowed opacity-50"
              >
                <FiGithub />
                <span>Source Code</span>
              </button>
            )}

            {hasLiveDemo ? (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // 🔥 FIX DI SINI
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-green-600 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </a>
            ) : (
              <button
                disabled
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-zinc-700 p-3 rounded-full cursor-not-allowed opacity-50"
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
