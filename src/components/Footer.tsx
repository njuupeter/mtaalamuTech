import { Link } from "react-router-dom";
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Mtaalamu<span className="text-indigo-600">Tech</span>
              </span>
            </Link>
            <p className="mt-6 text-sm text-slate-500 leading-relaxed">
              Leading the digital transformation in Tanzania. We provide premium IT, 
              investment, and technology services to help businesses and individuals thrive.
            </p>
            <div className="mt-8 flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Quick Links</h3>
            <ul className="mt-6 space-y-4">
              {["Home", "Services", "About Us", "Contact", "Booking"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600 font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Contact Us</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-indigo-600" />
                <span className="text-sm text-slate-500 font-medium">0716040796</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-indigo-600" />
                <span className="text-sm text-slate-500 font-medium font-mono text-xs">info@mtaalamutech.co.tz</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-indigo-600" />
                <span className="text-sm text-slate-500 font-medium">Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Newsletter</h3>
            <p className="mt-6 text-sm text-slate-500">
              Subscribe to get the latest updates and investment tips.
            </p>
            <form className="mt-6 flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-focus focus:border-indigo-600 focus:outline-none"
              />
              <button className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} MtaalamuTech. All rights reserved. Registered in Tanzania.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <a href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-600">Terms of Service</a>
            <a href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-600">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
