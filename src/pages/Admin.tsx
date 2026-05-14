import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, query, getDocs, where, doc, getDoc, setDoc } from "firebase/firestore";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CreditCard, 
  MessageSquare, 
  LogOut, 
  Loader2, 
  Settings,
  Bell,
  Search,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "../lib/utils";

// Sub-pages
import Overview from "./admin/Overview";
import Bookings from "./admin/Bookings";
import Payments from "./admin/Payments";
import Feedback from "./admin/Feedback";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, "admins", u.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          // Check if it's the owner email to auto-boost (for ease of setup)
          if (u.email === "njuupeter626@gmail.com") {
             await setDoc(doc(db, "admins", u.uid), { email: u.email });
             setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 rounded-[2.5rem] bg-white p-12 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
            <LayoutDashboard className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
            <p className="mt-2 text-slate-500">Access restricted to authorized personnel only.</p>
          </div>
          
          {user && isAdmin === false && (
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-800">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>Your account (<strong>{user.email}</strong>) does not have admin privileges. If you are the owner, contact support.</p>
            </div>
          )}

          <button
            onClick={user ? handleLogout : handleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800"
          >
            {user ? (
              <>
                <LogOut className="h-5 w-5" /> Sign Out
              </>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" className="h-5 w-5" /> Sign in with Google
              </>
            )}
          </button>
          
          <Link to="/" className="inline-block text-sm font-medium text-indigo-600 hover:underline">
            Back to Website
          </Link>
        </div>
      </div>
    );
  }

  const sidebarLinks = [
    { name: "Overview", icon: LayoutDashboard, path: "/admin" },
    { name: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
    { name: "Payments", icon: CreditCard, path: "/admin/payments" },
    { name: "Feedback", icon: MessageSquare, path: "/admin/feedback" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 lg:pl-64">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center gap-2">
            <div className="bg-indigo-600 p-1 rounded-lg">
               <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Admin Panel</span>
          </div>

          <nav className="flex-grow space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                  location.pathname === link.path 
                    ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex flex-grow flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search documents..."
                 className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:outline-none"
               />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-600 border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{user.displayName}</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Owner Access</p>
                </div>
                <img src={user.photoURL || ""} className="h-10 w-10 rounded-full border-2 border-indigo-600 p-0.5" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
