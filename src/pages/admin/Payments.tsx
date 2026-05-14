import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Payment } from "../../types";
import { formatDate, formatCurrency, cn } from "../../lib/utils";
import { Loader2, DollarSign, Download, Search } from "lucide-react";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const q = query(collection(db, "payments"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setPayments(snap.docs.map(d => ({ id: d.id, ...d.data() } as Payment)));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Payment History</h2>
        <p className="text-slate-500 text-sm">Monitor all financial transactions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-500/20">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">System Balance</p>
          <p className="mt-2 text-3xl font-black">{formatCurrency(12450000)}</p>
          <div className="mt-4 flex items-center justify-between text-[10px] font-bold">
            <span className="text-indigo-200">Across 24 Transactions</span>
            <span className="rounded-full bg-indigo-500 px-2 py-0.5">+12.4%</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <th className="px-6 py-4 font-bold text-slate-700">Transaction ID</th>
                <th className="px-6 py-4 font-bold text-slate-700">Booking ID</th>
                <th className="px-6 py-4 font-bold text-slate-700">Amount</th>
                <th className="px-6 py-4 font-bold text-slate-700">Method</th>
                <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                     <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-300" />
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center text-slate-400">
                    No transactions yet.
                  </td>
                </tr>
              ) : payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-600 uppercase">
                    {p.transactionId}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    #{p.bookingId?.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {formatCurrency(p.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600">
                      {p.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider",
                      p.status === "successful" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {formatDate(p.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
