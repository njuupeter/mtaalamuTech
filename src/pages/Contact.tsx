import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageSquare, Send, Clock, Globe } from "lucide-react";
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
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl">Get in <span className="text-indigo-600">Touch</span></h1>
              <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">
                Have a project in mind or need financial advice? Our team is standing by to assist 
                you. Send us a message and we'll reply within 24 business hours.
              </p>
              
              <div className="mt-12 space-y-8">
                {[
                  { icon: Phone, label: "Call Us", value: "0716040796" },
                  { icon: Mail, label: "Email Support", value: "info@mtaalamutech.co.tz" },
                  { icon: MapPin, label: "Office Location", value: "Dar es Salaam, Tanzania" },
                  { icon: Clock, label: "Business Hours", value: "Mon - Sat: 08:00 AM - 06:00 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
                      <p className="mt-1 font-bold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-indigo-50 blur-2xl" />
              <form 
                onSubmit={handleSubmit}
                className="rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/50 lg:p-12"
              >
                {sent && (
                  <div className="mb-8 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                      required
                      type="email" 
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="Your Email"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <input 
                    required
                    type="text" 
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <div className="mt-6 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Write your message here..."
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <button 
                  disabled={loading}
                  className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
                >
                  {loading ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
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
