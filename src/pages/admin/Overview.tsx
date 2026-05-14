import { useState, useEffect } from "react";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { formatCurrency } from "../../lib/utils";

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 13 },
  { name: 'Wed', revenue: 2000, bookings: 98 },
  { name: 'Thu', revenue: 2780, bookings: 39 },
  { name: 'Fri', revenue: 1890, bookings: 48 },
  { name: 'Sat', revenue: 2390, bookings: 38 },
  { name: 'Sun', revenue: 3490, bookings: 43 },
];

export default function Overview() {
  const [stats, setStats] = useState({
    bookings: 0,
    revenue: 0,
    feedback: 0,
    users: 0
  });

  useEffect(() => {
    // In a real app, you'd fetch real counts here
    setStats({
      bookings: 124,
      revenue: 4250000,
      feedback: 12,
      users: 89
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm">Welcome back. Here's what's happening with MtaalamuTech today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: stats.bookings, icon: Calendar, trend: "+12%", color: "indigo" },
          { label: "Total Revenue", value: formatCurrency(stats.revenue), icon: CreditCard, trend: "+8%", color: "emerald" },
          { label: "Total Feedback", value: stats.feedback, icon: MessageSquare, trend: "-2%", color: "amber" },
          { label: "Website Visitors", value: "2.4k", icon: Users, trend: "+24%", color: "blue" }
        ].map((item, i) => (
          <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl bg-${item.color}-50 p-3 text-${item.color}-600`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                item.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {item.trend.startsWith("+") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {item.trend}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-black text-slate-900">{item.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Revenue Breakdown</h3>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-lg px-2 py-1 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Booking Activity</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="bookings" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
