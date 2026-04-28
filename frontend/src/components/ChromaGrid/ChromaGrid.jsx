import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";
import { techIcons } from "../../data";

export const ChromaGrid = ({
  items,
  onItemClick,
  className = "",
  radius = 320,
  columns = 3,
  rows = 2,
  damping = 0.4,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      overwrite: true,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
    });
  };

  const handleMove = (e) => {
    const rect = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - rect.left, e.clientY - rect.top);

    gsap.to(fadeRef.current, {
      opacity: 0,
      duration: 0.25,
      overwrite: true,
    });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        "--r": `${radius}px`,
        "--cols": columns,
        "--rows": rows,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((project, i) => (
        <article
          key={i}
          className="chroma-card group"
          onMouseMove={handleCardMove}
          onClick={() => onItemClick(project)}
          style={{
            "--card-border": project.borderColor || "rgba(255,255,255,0.08)",
            "--card-gradient":
              project.gradient ||
              "linear-gradient(135deg, rgba(0,255,255,0.08), rgba(128,0,255,0.08))",
            cursor: "pointer",
          }}
        >
          {/* IMAGE */}
          <div className="chroma-img-wrapper">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* CONTENT */}
          <footer className="chroma-info">
            <div className="content-top">
              <h3 className="name">{project.title}</h3>

              <p className="role">
                {project.subtitle?.length > 120
                  ? `${project.subtitle.substring(0, 120)}...`
                  : project.subtitle}
              </p>
            </div>

            {/* TECH STACK */}
            {project.techStack?.length > 0 && (
              <div className="tech-stack">
                {(Array.isArray(project.techStack)
                  ? project.techStack
                  : project.techStack.split(",")
                )
                  .slice(0, 4)
                  .map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {techIcons[tech.trim().toLowerCase()] && (
                        <img
                          src={techIcons[tech.trim().toLowerCase()]}
                          alt={tech}
                          className="tech-icon"
                        />
                      )}
                      {tech.trim()}
                    </span>
                  ))}
              </div>
            )}

            {/* CTA */}
            <button className="view-project-btn">View Details</button>
          </footer>
        </article>
      ))}

      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </section>
  );
};

export default ChromaGrid;
