import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import WhatsAppButton from "./components/WhatsAppButton";
import { Loader2 } from "lucide-react";
import { LanguageProvider } from "./lib/LanguageContext";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Admin = lazy(() => import("./pages/Admin"));
const Contact = lazy(() => import("./pages/Contact"));

function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex min-h-screen flex-col font-sans text-slate-200 transition-colors duration-300 relative">
          {/* Background Elements */}
          <div className="atmosphere-bg" />
          <div className="noise-overlay" />
          <div className="grid-overlay" />
          <div className="glow-1" />
          <div className="glow-2" />
          <div className="glow-3" />
          <div className="glow-4" />

          <Navbar />
          <main className="flex-grow pt-16">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/checkout/:bookingId" element={<Checkout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Chatbot />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}
