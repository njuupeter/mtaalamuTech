import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { doc, getDoc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  Info
} from "lucide-react";
import { cn, formatCurrency } from "../lib/utils";
import { Booking } from "../types";

export default function Checkout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [method, setMethod] = useState<"mobile" | "card" | "bank">("mobile");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle");

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;
      const path = `bookings/${bookingId}`;
      try {
        const docRef = doc(db, "bookings", bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking({ id: docSnap.id, ...docSnap.data() } as Booking);
        } else {
          navigate("/services");
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, path);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, navigate]);

  const handlePayment = async () => {
    if (!booking) return;
    setIsProcessing(true);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const paymentData = {
        bookingId: booking.id,
        amount: 250000, 
        method: method,
        status: "successful",
        transactionId: "MT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, "payments"), paymentData);
      } catch (e) {
        handleFirestoreError(e, OperationType.CREATE, "payments");
      }
      
      // Update booking status
      const bookingPath = `bookings/${booking.id}`;
      try {
        await updateDoc(doc(db, "bookings", booking.id!), {
          status: "confirmed"
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, bookingPath);
      }

      setPaymentStatus("success");
    } catch (err) {
      console.error(err);
      setPaymentStatus("failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Transmission Successful</h1>
          <p className="mt-6 text-slate-400 font-medium leading-relaxed">
            We have confirmed your capital commitment for <strong>{booking?.serviceName}</strong>. 
            Operational blueprints have been dispatched to your neural address.
          </p>
          <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-8 text-left">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-widest">Hash ID</span>
              <span className="font-bold text-white">MT-SUCC-9921X</span>
            </div>
            <div className="flex justify-between pt-4 text-sm font-black uppercase tracking-widest">
              <span className="text-slate-400">Total Authorized</span>
              <span className="text-indigo-400">{formatCurrency(250000)}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="mt-12 w-full rounded-2xl bg-white px-8 py-5 font-black uppercase text-xs tracking-[0.2em] text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-xl"
          >
            Return to Command Center
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-20 flex items-center gap-8">
        <button onClick={() => navigate(-1)} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-slate-400 hover:text-white transition-all hover:bg-white/10">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl uppercase">Finalize <br /> <span className="text-indigo-400 font-serif italic lowercase tracking-tighter">transaction</span></h1>
          <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mt-2">Authorizing deployment for {booking?.serviceName}</p>
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { id: "mobile", name: "Network Alpha", icon: Smartphone, desc: "MOBILE ENERGY" },
              { id: "card", name: "Credit Delta", icon: CreditCard, desc: "GLOBAL PROTOCOLS" },
              { id: "bank", name: "Vault Direct", icon: Building2, desc: "INSTITUTIONAL RELAY" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={cn(
                  "flex flex-col items-center gap-6 rounded-[2.5rem] border-2 p-8 text-center transition-all group relative overflow-hidden",
                  method === m.id 
                    ? "border-indigo-600 bg-indigo-500/10 shadow-2xl shadow-indigo-600/20" 
                    : "border-white/5 bg-white/[0.03] hover:border-white/10"
                )}
              >
                {method === m.id && (
                  <div className="absolute top-0 right-0 p-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                  </div>
                )}
                <div className={cn(
                  "rounded-2xl p-4 transition-all duration-500 group-hover:scale-110",
                  method === m.id ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-500"
                )}>
                  <m.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-black text-white uppercase tracking-tighter text-lg">{m.name}</p>
                  <p className="mt-2 text-[8px] font-mono uppercase tracking-[0.3em] text-slate-600">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.01] -z-10" />
            {method === "mobile" && (
              <div className="space-y-8">
                <div className="flex items-center gap-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-5 text-indigo-400">
                  <Info className="h-6 w-6 shrink-0" />
                  <p className="text-sm font-bold leading-relaxed">Secure push authorization required. Initialize PIN entry on connected device.</p>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Terminal ID (Phone)</label>
                  <input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none placeholder:text-slate-700"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["VODACOM", "TIGO", "AIRTEL"].map(n => (
                    <div key={n} className="h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] tracking-widest text-slate-400 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer hover:border-indigo-500/50">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Encryption Core (Card #)</label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none placeholder:text-slate-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Temporal Key (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none placeholder:text-slate-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Security Node (CVV)</label>
                    <input
                      type="password"
                      placeholder="123"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 text-white focus:border-indigo-500 focus:bg-white/[0.07] focus:outline-none placeholder:text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === "bank" && (
              <div className="space-y-8 text-center py-6">
                <div className="mx-auto h-20 w-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                  <Building2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Target Institutional Account</p>
                  <p className="text-3xl font-black text-white tracking-tighter">NMB BANK PLC</p>
                  <p className="font-mono text-2xl text-indigo-400 font-black tracking-widest mt-4">20310045667</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">MTAALAMUTECH LTD OPS</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="mt-14 group relative flex w-full items-center justify-center gap-4 rounded-2xl bg-white px-8 py-6 font-black uppercase text-sm tracking-[0.3em] text-slate-900 transition-all hover:bg-slate-100 disabled:opacity-50 active:scale-95 shadow-2xl"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" /> Authorizing Transmission...
                </>
              ) : (
                <>Authorize {formatCurrency(250000)} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" /></>
              )}
            </button>
            <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Layer 7 Advanced Encryption Active</span>
            </div>
          </div>
        </div>

        {/* Summary Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-12 right-0 p-8 opacity-10">
               <img src="/logo.png" alt="" className="h-40 w-auto" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">Manifest Summary</h3>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Project Module</span>
                <span className="text-lg font-bold text-white uppercase tracking-tighter leading-none">{booking?.serviceName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Client ID</span>
                <span className="text-lg font-bold text-white uppercase tracking-tighter leading-none">{booking?.customerName}</span>
              </div>
              <div className="h-px bg-white/5 my-4" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Operational Value</span>
                <span className="text-3xl font-black text-indigo-400 tracking-tighter">{formatCurrency(250000)}</span>
              </div>
            </div>

            <div className="mt-16 rounded-[2rem] bg-white/5 border border-white/10 p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-3 flex items-center gap-2">
                <Info className="h-3 w-3" />
                Deduction Policy
              </p>
              <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">
                Authorized credits are immutable after 24h. System-wide integrity insured via standard protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
