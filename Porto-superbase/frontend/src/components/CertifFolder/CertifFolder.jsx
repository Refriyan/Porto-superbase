import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CertifFolder.css";

// ─────────────────────────────────────────
// Swiper Card
// ─────────────────────────────────────────
function SwiperCard({ cert, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(cert)}
      className="cf-card"
    >
      <div className="cf-card__img">
        {cert.image_url
          ? <img src={cert.image_url} alt={cert.title} loading="lazy" />
          : <div className="cf-card__placeholder">🏆</div>
        }
        <span className="cf-card__year">{cert.year}</span>
      </div>
      <div className="cf-card__body">
        <p className="cf-card__title">{cert.title}</p>
        <p className="cf-card__issuer">{cert.issuer}</p>
        {cert.credential_url && (
          <a
            href={cert.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="cf-card__link"
          >
            View Credential ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Folder Item (animasi CSS folder asli)
// ─────────────────────────────────────────
function FolderItem({ issuer, certs, isOpen, color, onToggle, onCertClick }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
    setTimeout(() => {
      setCanLeft(el.scrollLeft > 0);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, 350);
  };

  return (
    <div className="cf-folder-wrap">
      {/* ── Folder icon (CSS animasi asli) ── */}
      <button
        onClick={onToggle}
        className={`cf-folder-btn ${isOpen ? "cf-folder-btn--active" : ""}`}
      >
        <div className={`folder ${isOpen ? "open" : ""}`}
          style={{ "--folder-color": color, "--folder-back-color": color + "cc" }}>
          <div className="folder__back">
            {certs.slice(0, 3).map((cert, i) => (
              <div key={i} className="paper">
                {cert.image_url && (
                  <img src={cert.image_url} alt={cert.title}
                    className="w-full h-full object-cover rounded" />
                )}
              </div>
            ))}
            <div className="folder__front" />
          </div>
        </div>

        <p className="cf-folder-btn__name">{issuer}</p>
        <p className="cf-folder-btn__count">{certs.length} certificate{certs.length > 1 ? "s" : ""}</p>
      </button>

      {/* ── Swiper panel muncul di bawah saat open ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="cf-panel"
            style={{ "--accent": color }}
          >
            {/* Panel header */}
            <div className="cf-panel__header">
              <span className="cf-panel__dot" style={{ background: color }} />
              <span className="cf-panel__title">{issuer}</span>
              <span className="cf-panel__count">{certs.length} certs</span>
              <div className="cf-panel__arrows">
                <button
                  onClick={() => scroll(-1)}
                  disabled={!canLeft}
                  className={`cf-panel__arrow ${!canLeft ? "cf-panel__arrow--disabled" : ""}`}
                >‹</button>
                <button
                  onClick={() => scroll(1)}
                  disabled={!canRight}
                  className={`cf-panel__arrow ${!canRight ? "cf-panel__arrow--disabled" : ""}`}
                >›</button>
              </div>
              <button onClick={onToggle} className="cf-panel__close">✕ Tutup</button>
            </div>

            {/* Swiper track */}
            <div
              ref={trackRef}
              className="cf-panel__track"
              onScroll={e => {
                setCanLeft(e.target.scrollLeft > 0);
                setCanRight(e.target.scrollLeft + e.target.clientWidth < e.target.scrollWidth - 4);
              }}
            >
              {certs.map(cert => (
                <SwiperCard key={cert.id} cert={cert} onClick={onCertClick} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
// Modal detail
// ─────────────────────────────────────────
function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="cf-modal__overlay" onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="cf-modal__box"
          onClick={e => e.stopPropagation()}
        >
          {cert.image_url && (
            <div className="cf-modal__img">
              <img src={cert.image_url} alt={cert.title} />
            </div>
          )}
          <div className="cf-modal__body">
            <h3 className="cf-modal__title">{cert.title}</h3>
            <p className="cf-modal__meta">{cert.issuer} · {cert.year}</p>
            <div className="cf-modal__actions">
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                  className="cf-modal__btn cf-modal__btn--primary">
                  View Credential ↗
                </a>
              )}
              <button onClick={onClose} className="cf-modal__btn cf-modal__btn--secondary">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
const FOLDER_COLORS = [
  "#70a1ff", "#ff6b81", "#eccc68", "#7bed9f",
  "#a29bfe", "#fd79a8", "#55efc4", "#fdcb6e",
];

export default function CertifFolder({ certificates }) {
  const [openFolder, setOpenFolder] = useState(null);
  const [selected, setSelected] = useState(null);

  const grouped = certificates.reduce((acc, cert) => {
    const key = cert.issuer || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(cert);
    return acc;
  }, {});

  const folders = Object.entries(grouped);

  const toggle = (issuer) => {
    setOpenFolder(prev => prev === issuer ? null : issuer);
  };

  return (
    <div className="cf-root">
      {/* ── Grid folder ── */}
      <div className="cf-grid">
        {folders.map(([issuer, certs], idx) => (
          <FolderItem
            key={issuer}
            issuer={issuer}
            certs={certs}
            isOpen={openFolder === issuer}
            color={FOLDER_COLORS[idx % FOLDER_COLORS.length]}
            onToggle={() => toggle(issuer)}
            onCertClick={setSelected}
          />
        ))}
      </div>

      {/* ── Modal ── */}
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
