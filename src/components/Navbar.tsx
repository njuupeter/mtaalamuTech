import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, User, Languages, Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useLanguage } from "../lib/LanguageContext";
import { useTheme } from "../lib/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
          ? "border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-[#05060f]/60 py-4 backdrop-blur-2xl"
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

          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-600 dark:hover:text-white hover:tracking-[0.3em]",
                  location.pathname === link.href ? "text-indigo-600" : "text-slate-500 dark:text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-sm"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setLanguage(language === "en" ? "sw" : "en")}
                className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-sm"
              >
                <Languages className="h-4 w-4" />
                {language === "en" ? "SW" : "EN"}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              className="p-2 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Languages className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
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
            className="fixed inset-x-0 top-[80px] bottom-0 bg-white dark:bg-[#05060f]/95 backdrop-blur-3xl border-b border-slate-200 dark:border-white/5 md:hidden z-40 overflow-y-auto"
          >
            <div className="flex flex-col h-full space-y-2 px-6 pb-20 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-2xl px-8 py-5 text-xl font-black uppercase tracking-[0.2em] transition-all",
                    location.pathname === link.href 
                      ? "bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/20 shadow-xl" 
                      : "text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-10 mt-auto grid gap-4">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-6 text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <span className="text-indigo-400 font-serif italic lowercase">{theme === "dark" ? "Switch" : "Switch"}</span>
                </button>

                <button
                  onClick={() => {
                    setLanguage(language === "en" ? "sw" : "en");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-6 text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    <Languages className="h-5 w-5" />
                    {language === "en" ? "Kiswahili" : "English"}
                  </span>
                  <span className="text-indigo-400">{language === "en" ? "SW" : "EN"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
