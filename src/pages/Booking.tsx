import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Loader2, CheckCircle, Calendar, Phone, Mail, User, MessageSquare } from "lucide-react";
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
      <div className="flex min-h-[60vh] items-center justify-center py-24">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md rounded-3xl bg-white p-12 text-center shadow-2xl"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Booking Confirmed!</h1>
          <p className="mt-4 text-slate-600">
            Thank you for choosing MtaalamuTech. Your request has been received. 
            Redirecting you to the secure payment portal...
          </p>
          <Loader2 className="mx-auto mt-8 h-8 w-8 animate-spin text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Book a Service</h1>
        <p className="mt-4 text-lg text-slate-600">Fill in the details below and we'll get back to you shortly.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Info Side */}
        <div className="lg:col-span-1">
          <div className="rounded-3xl bg-indigo-600 p-8 text-white">
            <h2 className="text-xl font-bold">Why book with us?</h2>
            <ul className="mt-8 space-y-6">
              {[
                { icon: Calendar, text: "Instant Scheduling" },
                { icon: Phone, text: "Direct Callback" },
                { icon: CheckCircle, text: "Fixed Pricing" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="rounded-lg bg-white/20 p-2">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-indigo-100">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-12 rounded-2xl bg-indigo-500/50 p-6 text-sm">
              <p className="italic">"We treat every project as our own. Quality is our baseline."</p>
              <p className="mt-4 font-bold">— MtaalamuTech Team</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
            {error && (
              <div className="rounded-xl bg-rose-50 p-4 text-sm font-medium text-rose-600">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Select Service</label>
              <select
                required
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-focus focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">Select a service...</option>
                {servicesList.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 transition-focus focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    required
                    type="tel"
                    placeholder="07XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 transition-focus focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 transition-focus focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message / Requirements</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                <textarea
                  rows={4}
                  placeholder="Tell us more about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 transition-focus focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
