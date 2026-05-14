import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import OfficeMap from "./OfficeMap";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#05060f] relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-indigo-600/5 -z-10" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo.png" 
                alt="MtaalamuTech" 
                className="h-12 w-auto brightness-110 dark:brightness-110 grayscale dark:grayscale-0 transition-transform group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="mt-8 text-sm text-slate-500 leading-relaxed font-medium">
              Architecting the digital frontier in East Africa. We deliver high-frequency 
              technical solutions and elite market intelligence for the modern visionary.
            </p>
            <div className="mt-10 flex gap-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group rounded-xl p-3 text-slate-400 glass-card glass-hover"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Registry</h2>
            <ul className="mt-8 space-y-4">
              {["Home", "Services", "About", "FAQ", "Contact", "Booking", "Dashboard"].map((link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "Home" ? "/" : 
                      link === "Dashboard" ? "/admin" : 
                      link === "FAQ" ? "/#faq" :
                      `/${link.toLowerCase().replace(" ", "")}`
                    }
                    className="text-sm font-bold text-slate-500 transition-all hover:text-indigo-600 dark:hover:text-white hover:pl-2"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-8">Base of Operations</h2>
            <OfficeMap />
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Comms Hub</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-slate-100 dark:bg-white/5 p-2 border border-black/5 dark:border-white/10 text-indigo-400">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold">0716040796</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-slate-100 dark:bg-white/5 p-2 border border-black/5 dark:border-white/10 text-indigo-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold font-mono text-xs uppercase tracking-tighter">info@mtaalamutech.co.tz</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-slate-100 dark:bg-white/5 p-2 border border-black/5 dark:border-white/10 text-indigo-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Data Stream</h2>
            <p className="mt-8 text-sm text-slate-500 font-medium">
              Synchronize with our latest intelligence and technical updates.
            </p>
            <form className="mt-8 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Neural ID (Email)"
                className="rounded-xl border border-black/10 dark:border-white/5 bg-white shadow-sm dark:bg-white/[0.03] px-5 py-3.5 text-sm text-slate-900 dark:text-white transition-all focus:border-indigo-600 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <button className="w-full rounded-xl bg-slate-900 dark:bg-white py-3.5 text-xs font-black uppercase tracking-widest text-white dark:text-slate-900 transition-all hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                Synchronize
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 border-t border-slate-200 dark:border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
            &copy; {currentYear} MTAALAMUTECH OPS. BEYOND LIMITS.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Refunds"].map((item) => (
               <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
