import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Project", "Contact"];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
      w-[95%] max-w-7xl rounded-2xl transition-all duration-300
      ${
        scrolled
          ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <h1 className="text-white font-semibold text-lg tracking-wide">
          Portofolio
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 top-full w-full transition-all duration-300
        ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}
      >
        <div className="mx-4 mt-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl p-6 flex flex-col items-center gap-5">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/80 hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
