import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Loader2, CheckCircle, Calendar, Phone, Mail, User, MessageSquare, ArrowRight, Check } from "lucide-react";
import { cn } from "../lib/utils";

enum OperationType {
  CREATE = 'create',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const servicesList = [
  { id: "investment", name: "Investment Services" },
  { id: "forex", name: "FX Trading & Education" },
  { id: "web-dev", name: "Web Development" },
  { id: "programming", name: "Custom Programming" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "teaching", name: "Technical Training" },
  { id: "led-ops", name: "LED Screen Operation" },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedServiceId = searchParams.get("service");

  const [formData, setFormData] = useState({
    serviceId: selectedServiceId || "",
    customerName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const selectedService = servicesList.find(s => s.id === formData.serviceId);
      const bookingData = {
        ...formData,
        serviceName: selectedService?.name || "Other",
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      setIsSuccess(true);
      // Wait a bit then redirect to checkout
      setTimeout(() => {
        navigate(`/checkout/${docRef.id}`);
      }, 2000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "bookings");
      setError("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-24 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Booking Logged</h1>
          <p className="mt-6 text-slate-400 font-medium leading-relaxed">
            Your request has been successfully transmitted. Initializing secure payment link for project authorization...
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Secure Handshake in Progress</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 sm:mb-20 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-white sm:text-8xl uppercase leading-none">Initialize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-serif italic lowercase">engagement</span></h1>
        <p className="mt-6 sm:mt-8 text-sm sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto px-4">Configure your service parameters below to initiate the technical briefing and project onboarding.</p>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        {/* Info Side */}
        <div className="lg:col-span-1">
          <div className="rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-12 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
              <img src="/logo.png" alt="" className="h-40 w-auto" />
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter">Mission Protocols</h2>
            <ul className="mt-12 space-y-10">
              {[
                { icon: Calendar, text: "Instant Slot Reservation" },
                { icon: Phone, text: "Priority Signal Access" },
                { icon: CheckCircle, text: "Transparent Value Schema" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group/item">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400 transition-transform group-hover/item:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-slate-300 tracking-wide uppercase text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-16 rounded-[2rem] bg-white/5 border border-white/10 p-8 text-sm">
              <p className="italic text-slate-400 leading-relaxed font-serif text-lg">"Excellence is not an objective; it's the fundamental architecture of our operations."</p>
              <p className="mt-6 font-black uppercase tracking-widest text-indigo-400">— SYSTEM CORE</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-2 relative">
          <div className="absolute -inset-10 -z-10 bg-indigo-500/5 blur-[100px] rounded-full" />
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 border border-white/10 p-6 sm:p-12 backdrop-blur-2xl transition-all hover:bg-white/[0.08] shadow-2xl">
            {error && (
              <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-5 text-sm font-bold text-rose-400">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Module Selection</label>
              <select
                required
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select project module...</option>
                {servicesList.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity</label>
                <div className="relative">
                  <User className="absolute left-6 top-5 h-5 w-5 text-slate-600" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-4 pl-16 pr-6 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Comms Frequency</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-5 h-5 w-5 text-slate-600" />
                  <input
                    required
                    type="tel"
                    placeholder="+255 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-4 pl-16 pr-6 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Relay Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-5 h-5 w-5 text-slate-600" />
                <input
                  required
                  type="email"
                  placeholder="name@provider.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-4 pl-16 pr-6 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Deployment Specifications</label>
              <div className="relative">
                <MessageSquare className="absolute left-6 top-6 h-5 w-5 text-slate-600" />
                <textarea
                  rows={4}
                  placeholder="Outline your project requirements and target objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-4 pl-16 pr-6 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-4 rounded-2xl bg-white px-8 py-5 font-black uppercase text-sm tracking-[0.2em] text-slate-900 transition-all hover:bg-slate-100 disabled:opacity-50 overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Synchronizing...
                </>
              ) : (
                <>Initialize Deployment <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
