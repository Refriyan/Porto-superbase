import { useEffect, useState } from "react";
import { getProjects } from "../services/project";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-10 text-center">My Projects</h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 cursor-pointer hover:scale-105 transition duration-300"
          >
            <img
              src={`https://ptlrakqipiteinujfrhg.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold">{project.title}</h3>

              <p className="text-gray-400 text-sm">{project.description}</p>

              <p className="text-purple-400 text-sm mt-2">
                {project.tech_stack || "No tech"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-[500px] relative">
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <img
              src={`https://ptlrakqipiteinujfrhg.supabase.co/storage/v1/object/public/projects/${selectedProject.image_url}`}
              className="w-full h-52 object-cover rounded mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>

            <p className="text-gray-400 mb-3">{selectedProject.description}</p>

            <p className="text-purple-400 mb-5">
              {selectedProject.tech_stack || "No tech info"}
            </p>

            <div className="flex gap-3">
              <a
                href={selectedProject.live_demo || "#"}
                target="_blank"
                className={`flex-1 text-center py-2 rounded ${
                  selectedProject.live_demo
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 pointer-events-none"
                }`}
              >
                Live Demo
              </a>

              <a
                href={selectedProject.github_url || "#"}
                target="_blank"
                className={`flex-1 text-center py-2 rounded ${
                  selectedProject.github_url
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-600 pointer-events-none"
                }`}
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
console.log(selectedProject);