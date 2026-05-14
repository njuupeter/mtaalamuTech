import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { doc, getDoc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  ArrowLeft,
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
      try {
        const docRef = doc(db, "bookings", bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking({ id: docSnap.id, ...docSnap.data() } as Booking);
        } else {
          navigate("/services");
        }
      } catch (err) {
        console.error(err);
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
        amount: 250000, // Hardcoded for demo or derived from service
        method: method,
        status: "successful",
        transactionId: "MT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "payments"), paymentData);
      
      // Update booking status
      await updateDoc(doc(db, "bookings", booking.id!), {
        status: "confirmed"
      });

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
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Payment Successful!</h1>
          <p className="mt-4 text-slate-600">
            We have received your payment for <strong>{booking?.serviceName}</strong>. 
            An invoice has been sent to your email. Our team will contact you shortly.
          </p>
          <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-left">
            <div className="flex justify-between border-b border-slate-200 pb-3 text-sm">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono font-bold">MT-SUCC-9921X</span>
            </div>
            <div className="flex justify-between pt-3 text-sm font-bold">
              <span>Total Paid</span>
              <span className="text-indigo-600">{formatCurrency(250000)}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="mt-10 w-full rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Secure Checkout</h1>
          <p className="text-slate-500">Complete your payment for {booking?.serviceName}</p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { id: "mobile", name: "Mobile Money", icon: Smartphone, desc: "M-Pesa, TigoPesa, Airtel" },
              { id: "card", name: "Credit/Debit", icon: CreditCard, desc: "Visa, Mastercard" },
              { id: "bank", name: "Bank Transfer", icon: Building2, desc: "NMB, CRDB, NBC" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={cn(
                  "flex flex-col items-center gap-4 rounded-3xl border-2 p-6 text-center transition-all",
                  method === m.id 
                    ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-500/10" 
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className={cn(
                  "rounded-2xl p-3 transition-colors",
                  method === m.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <m.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{m.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50">
            {method === "mobile" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-2xl bg-amber-50 p-4 text-amber-800">
                  <Info className="h-5 w-5" />
                  <p className="text-sm">You will receive a push notification on your phone for PIN entry.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-rose-500 italic">Vodacom</div>
                  <div className="h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-blue-500 italic">Tigo</div>
                  <div className="h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-red-600 italic">Airtel</div>
                </div>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === "bank" && (
              <div className="space-y-6">
                <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                  <p className="text-sm text-slate-500">Please transfer to the following account and upload proof.</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-lg font-bold text-slate-900">NMB Bank PLC</p>
                    <p className="font-mono text-indigo-600 font-bold">20310045667</p>
                    <p className="text-xs uppercase text-slate-400">MTAALAMUTECH LTD</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Processing...
                </>
              ) : (
                <>Pay {formatCurrency(250000)} Securely</>
              )}
            </button>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Payments are encrypted and secured by MtaalamuTech Gateway</span>
            </div>
          </div>
        </div>

        {/* Summary Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl bg-slate-900 p-8 text-white">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Service</span>
                <span>{booking?.serviceName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Client</span>
                <span>{booking?.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tax</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="h-px bg-slate-800" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-indigo-400">{formatCurrency(250000)}</span>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-indigo-500/10 p-6">
              <p className="text-xs text-indigo-200/70 leading-relaxed uppercase tracking-widest font-bold mb-4">Refund Policy</p>
              <p className="text-xs text-indigo-50/60 leading-relaxed">
                Payments are refundable within 24 hours if service hasn't started. 
                Contact support for dispute resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
