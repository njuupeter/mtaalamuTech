import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageSquare, Send, Clock, Globe, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { cn } from "../lib/utils";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contact_requests"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl">Contact <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-serif italic">Command</span></h1>
              <p className="mt-8 text-lg text-slate-400 leading-relaxed max-w-xl font-medium">
                Our operations team is ready to assist. Whether you're initializing a new project 
                or seeking market intelligence, we are here.
              </p>
              
              <div className="mt-16 space-y-10">
                {[
                  { icon: Phone, label: "Neural Link", value: "0716040796" },
                  { icon: Mail, label: "Data Stream", value: "info@mtaalamutech.co.tz" },
                  { icon: MapPin, label: "Base Location", value: "Dar es Salaam, Tanzania" },
                  { icon: Clock, label: "Uptime", value: "Mon - Sat: 08:00 AM - 06:00 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400 transition-transform group-hover:scale-110 group-hover:bg-white/10">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                      <p className="mt-1 text-lg font-bold text-white transition-colors group-hover:text-indigo-400">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-indigo-600/10 blur-[80px]" />
              <form 
                onSubmit={handleSubmit}
                className="rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MessageSquare className="h-24 w-24 text-white" />
                </div>
                
                {sent && (
                  <div className="mb-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-sm font-bold text-emerald-400 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    Transmission Received. Awaiting Response.
                  </div>
                )}
                
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Full Name"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Digital Address</label>
                    <input 
                      required
                      type="email" 
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="Email@domain.com"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Objective</label>
                  <input 
                    required
                    type="text" 
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    placeholder="Subject of inquiry"
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="mt-8 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Intelligence</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Details of your request..."
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <button 
                  disabled={loading}
                  className="mt-12 group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-5 font-black text-slate-900 transition-all hover:bg-slate-100 disabled:opacity-50"
                >
                  {loading ? "Transmitting..." : <>Initiate Contact <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
         <div className="overflow-hidden rounded-[3rem] bg-slate-100 h-[400px] relative border border-slate-200">
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
               <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <MapPin className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Our Office</h3>
                  <p className="text-slate-500 mt-2">Dar es Salaam, Tanzania</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    className="mt-6 inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                  >
                    Open in Google Maps <Globe className="h-4 w-4" />
                  </a>
               </div>
            </div>
            {/* Simulation of a map image */}
            <div className="absolute inset-0 grayscale opacity-30">
               <div className="h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
         </div>
      </section>
    </div>
  );
}
