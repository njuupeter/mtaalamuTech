import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, User, Languages } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useLanguage } from "../lib/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_services"), href: "/services" },
    { name: t("nav_about"), href: "/about" },
    { name: t("nav_faq"), href: "/#faq" },
    { name: t("nav_contact"), href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "border-b border-white/5 bg-[#05060f]/60 py-4 backdrop-blur-2xl"
          : "bg-transparent py-8"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="MtaalamuTech" 
              className="h-12 w-auto transition-all duration-500 group-hover:scale-110 filter brightness-110" 
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-white hover:tracking-[0.3em]",
                  location.pathname === link.href ? "text-indigo-400" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
            >
              <Languages className="h-4 w-4" />
              {language === "en" ? "SW" : "EN"}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              className="p-2 text-slate-400"
            >
              <Languages className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-indigo-400 p-2"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[88px] bg-[#05060f]/95 backdrop-blur-2xl border-b border-white/5 md:hidden z-40"
          >
            <div className="space-y-2 px-6 pb-12 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-2xl px-6 py-6 text-lg font-black uppercase tracking-[0.2em] transition-all",
                    location.pathname === link.href 
                      ? "bg-white/5 text-indigo-400 border border-white/10" 
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
