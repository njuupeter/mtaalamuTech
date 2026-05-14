import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Booking } from "../../types";
import { formatDate, cn } from "../../lib/utils";
import { 
  MoreHorizontal, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCcw,
  Search,
  Filter,
  Loader2
} from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as any } : b));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = bookings.filter(b => filter === "all" || b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Bookings</h2>
          <p className="text-slate-500 text-sm">Review and manage service requests.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          <RefreshCcw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all",
              filter === f ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <th className="px-6 py-4 font-bold text-slate-700">Client</th>
                <th className="px-6 py-4 font-bold text-slate-700">Service</th>
                <th className="px-6 py-4 font-bold text-slate-700">Date</th>
                <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                     <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-300" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center text-slate-400 font-medium">
                    No bookings found.
                  </td>
                </tr>
              ) : filtered.map((b) => (
                <tr key={b.id} className="group hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{b.customerName}</p>
                      <p className="text-xs text-slate-500">{b.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                      {b.serviceName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {formatDate(b.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                      b.status === "confirmed" && "bg-emerald-50 text-emerald-600",
                      b.status === "pending" && "bg-amber-50 text-amber-600",
                      b.status === "cancelled" && "bg-rose-50 text-rose-600",
                      b.status === "completed" && "bg-blue-50 text-blue-600",
                    )}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateStatus(b.id!, "confirmed")}
                        className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        title="Confirm"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteBooking(b.id!)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
