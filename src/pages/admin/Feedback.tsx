import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Feedback } from "../../types";
import { formatDate, cn } from "../../lib/utils";
import { Star, CheckCircle, Trash2, Loader2, MessageSquare } from "lucide-react";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setFeedbacks(snap.docs.map(d => ({ id: d.id, ...d.data() } as Feedback)));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const toggleApproval = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, "feedback", id), { approved: !current });
      setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, approved: !current } : f));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Customer Feedback</h2>
        <p className="text-slate-500 text-sm">Review and approve testimonials for display.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full py-24 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="col-span-full py-24 text-center rounded-3xl bg-white border border-dashed border-slate-200">
            <MessageSquare className="mx-auto h-12 w-12 text-slate-200 mb-4" />
            <p className="text-slate-400">No feedback submissions yet.</p>
          </div>
        ) : feedbacks.map((f) => (
          <div key={f.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4", 
                        i < f.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                      )} 
                    />
                  ))}
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                  f.approved ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>
                  {f.approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="text-slate-700 italic border-l-4 border-indigo-100 pl-4 py-1 mb-6">"{f.message}"</p>
              <p className="font-bold text-slate-900 text-sm">{f.customerName}</p>
              <p className="text-xs text-slate-400">{formatDate(f.createdAt)}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-50 flex gap-2">
               <button 
                 onClick={() => toggleApproval(f.id!, f.approved)}
                 className={cn(
                   "flex-grow flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all",
                   f.approved ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                 )}
               >
                 {f.approved ? "Unapprove" : "Approve Testimonial"}
               </button>
               <button className="rounded-xl bg-slate-50 p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                  <Trash2 className="h-4 w-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
