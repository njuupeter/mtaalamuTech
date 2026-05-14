import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Layout, 
  Code, 
  Monitor, 
  BookOpen, 
  Cpu,
  CheckCircle2,
  ChevronRight,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import Visual3D from "../components/Visual3D";
import { PRICING_DETAILS } from "../constants";

const services = [
  {
    id: "forex",
    title: "FX Intelligence & Training",
    category: "Finance",
    description: "Master the art of currency trading. Inspired by TradingView's precision, we offer high-fidelity charting education and professional risk management protocols.",
    icon: TrendingUp,
    color: "emerald",
    features: ["Real-time FX Analytics", "Smart Money Concepts", "Institutional Order Flow", "Mentorship Programs"],
    visualType: "trading" as const
  },
  {
    id: "investment",
    title: "Global Investment Advisory",
    category: "Finance",
    description: "Navigate global markets with institutional-grade insights. We track real-time trends in equities, commodities, and real estate to optimize your capital growth.",
    icon: BarChart3,
    color: "indigo",
    features: ["Advanced Market Data", "Portfolio Synchronization", "Risk-Mitigation Strategies", "Technical Analysis Tools"],
    visualType: "graph" as const
  },
  {
    id: "web-dev",
    title: "Premium Web Engineering",
    category: "Engineering",
    description: "Deployment of high-frequency, standards-compliant web architectures. We follow W3C protocols to build scalable SaaS, e-commerce, and enterprise portals.",
    icon: Globe,
    color: "blue",
    features: ["Full-Stack Architecture", "W3C Standards Compliance", "Cloud-Native Infrastructure", "Performance Optimization"],
    visualType: "code" as const
  },
  {
    id: "programming",
    title: "Core Software Solutions",
    category: "Engineering",
    description: "Algorithmic excellence for complex business challenges. From Python automation to Java enterprise systems, we engineer robust digital tools.",
    icon: Cpu,
    color: "violet",
    features: ["Python & Java Systems", "RESTful API Development", "Database Optimization", "Legacy System Refactoring"],
    visualType: "code" as const
  },
  {
    id: "graphic-design",
    title: "Visionary Brand Design",
    category: "Creative",
    description: "Crafting distinct visual identities that resonate. Our design methodology ensures your brand maintains a premium aesthetic across all digital touchpoints.",
    icon: Layout,
    color: "orange",
    features: ["Strategic UI/UX Design", "Corporate Identity Kits", "Visual Communication", "Vector Illustration"],
    visualType: "design" as const
  },
  {
    id: "teaching",
    title: "Technical Literacy Programs",
    category: "Education",
    description: "Empowering organizations with modern technical skills. Our workshops are designed to bridge the digital divide for schools and corporate teams.",
    icon: BookOpen,
    color: "rose",
    features: ["Software Mastery Courses", "Web Tech Fundamentals", "Cybersecurity Literacy", "Corporate Upskilling"],
    visualType: "abstract" as const
  },
  {
    id: "led-ops",
    title: "LED Screen Integration",
    category: "Engineering",
    description: "Powered by NovaStar technology. We provide end-to-end operation for high-resolution digital displays, ensuring pixel-perfect visual delivery.",
    icon: Monitor,
    color: "cyan",
    features: ["NovaStar Control Systems", "Pixel Calibration", "Synchronized Display Sync", "Event Visual Logistics"],
    visualType: "screen" as const
  }
];

const categories = ["All", "Finance", "Engineering", "Creative", "Education"];

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative rounded-[2.5rem] transition-all", className)}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedServicePrice, setSelectedServicePrice] = useState("forex");
  const { t } = useLanguage();

  const currentPrices = PRICING_DETAILS[selectedServicePrice as keyof typeof PRICING_DETAILS] || PRICING_DETAILS["forex"];

  const services = [
    {
      id: "forex",
      title: t("card_fx_title"),
      category: "Finance",
      description: t("card_fx_desc"),
      icon: TrendingUp,
      color: "emerald",
      features: ["FX Analytics", "Smart Money", "Trade Flow", "Mentorship"],
      visualType: "trading" as const
    },
    {
      id: "investment",
      title: t("card_intel_title"),
      category: "Finance",
      description: t("card_intel_desc"),
      icon: BarChart3,
      color: "indigo",
      features: ["Advanced Data", "Portfolio Sync", "Risk Mitigation", "Technical Analysis"],
      visualType: "investment" as const
    },
    {
      id: "web-dev",
      title: t("card_web_title"),
      category: "Engineering",
      description: t("card_web_desc"),
      icon: Globe,
      color: "blue",
      features: ["Full-Stack", "W3C Compliant", "Cloud Native", "Performance Ops"],
      visualType: "computing" as const
    },
    {
      id: "programming",
      title: t("card_logic_title"),
      category: "Engineering",
      description: t("card_logic_desc"),
      icon: Cpu,
      color: "violet",
      features: ["System Design", "API Development", "DB Optimization", "Refactoring"],
      visualType: "logic" as const
    },
    {
      id: "graphic-design",
      title: t("card_media_title"),
      category: "Creative",
      description: t("card_media_desc"),
      icon: Layout,
      color: "orange",
      features: ["UI/UX Strategy", "Brand Kits", "Visual Comms", "Design Systems"],
      visualType: "media" as const
    },
    {
      id: "led-ops",
      title: t("card_led_title"),
      category: "Engineering",
      description: t("card_led_desc"),
      icon: Monitor,
      color: "cyan",
      features: ["NovaStar Setup", "Pixel Precision", "Real-time Sync", "Visual Logistics"],
      visualType: "screen" as const
    }
  ];

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl font-black tracking-tight sm:text-7xl text-white uppercase leading-[1.1]">
              Full Spectrum <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Innovation</span>
            </h1>
            <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
              Experience the convergence of technology and finance. MtaalamuTech provides the 
              tools for the next generation of digital leaders.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 sm:mt-16 relative z-10"
          >
            <div className="flex overflow-x-auto pb-4 sm:pb-0 scrollbar-hide sm:flex-wrap sm:justify-center gap-2 sm:gap-3 px-4 -mx-4 sm:px-0 sm:mx-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 border",
                    activeCategory === cat
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                      : "glass-card text-slate-400 hover:border-white/20 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid gap-10 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <TiltCard className="group h-full">
                  <div className="flex flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:flex-row h-full glass-card border-white/5 shadow-2xl">
                    {/* Visual Side */}
                    <div className={cn(
                      "relative h-40 sm:h-48 w-full lg:h-auto lg:w-56 lg:flex-shrink-0 overflow-hidden",
                      `bg-gradient-to-br from-${service.color}-600/20 to-transparent`
                    )}>
                      <Visual3D color={service.color} type={service.visualType} className="scale-125 sm:scale-150 transform-gpu" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={cn(
                          "p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl",
                          `text-${service.color}-400`
                        )}>
                          <service.icon className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-slate-300">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-grow flex-col p-6 sm:p-8 lg:p-10 justify-between">
                      <div>
                        <h2 className="text-lg sm:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                          {service.title}
                        </h2>
                        <p className="mt-3 sm:mt-4 text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                          {service.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-slate-300">
                              <div className={cn("h-1 w-1 rounded-full", `bg-${service.color}-500 shadow-[0_0_8px] shadow-${service.color}-500`)} />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                        <span className="font-mono text-[10px] tracking-widest text-slate-500 order-2 sm:order-1">#{service.id.toUpperCase()}</span>
                        <a 
                          href="#pricing"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            setSelectedServicePrice(service.id);
                          }}
                          className="group/link w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 order-1 sm:order-2 cursor-pointer"
                        >
                          {t("ui_booking")} <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Pricing Table Section */}
      <section id="pricing" className="container mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 underline underline-offset-8">Unit Economics</h2>
          <p className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-7xl uppercase">Optimized Packages</p>
          
          <div className="mt-12 flex flex-col items-center gap-8">
            {/* Billing Toggle */}
            <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-full border border-white/10">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                  billingCycle === "monthly" ? "bg-white text-slate-900 shadow-xl scale-105" : "text-slate-500 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                  billingCycle === "yearly" ? "bg-white text-slate-900 shadow-xl scale-105" : "text-slate-500 hover:text-white"
                )}
              >
                Yearly
                <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-emerald-500 text-[6px] text-white rounded-full">Save 20%</span>
              </button>
            </div>

            {/* Service Selector */}
            <div className="flex overflow-x-auto pb-4 sm:pb-0 scrollbar-hide sm:flex-wrap justify-center gap-3 w-full px-4 sm:px-0">
              {Object.keys(PRICING_DETAILS).map((serviceId) => (
                <button
                  key={serviceId}
                  onClick={() => setSelectedServicePrice(serviceId)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter transition-all border",
                    selectedServicePrice === serviceId 
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-400" 
                      : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300"
                  )}
                >
                  {serviceId.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              name: "Standard",
              price: currentPrices.basic[billingCycle],
              desc: "Foundation for individual learners and small scale operations.",
              items: currentPrices.basic.features,
              highlight: false
            },
            {
              name: "Premium",
              price: currentPrices.pro[billingCycle],
              desc: "Optimized for growing businesses and serious practitioners.",
              items: currentPrices.pro.features,
              highlight: true
            },
            {
              name: "Elite",
              price: currentPrices.elite[billingCycle],
              desc: "Dedicated institutional-grade solutions for large organizations.",
              items: currentPrices.elite.features,
              highlight: false
            }
          ].map((plan, i) => (
            <div key={i} className={cn(
              "flex flex-col rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 transition-all border relative overflow-hidden group",
              plan.highlight 
                ? "bg-indigo-600 border-white/20 text-white shadow-[0_0_50px_rgba(79,70,229,0.3)] scale-100 md:scale-105 z-10" 
                : "glass-card text-slate-200"
            )}>
              {plan.highlight && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">Most Popular</div>
              )}
              <h3 className="text-xl font-black uppercase tracking-widest">{plan.name}</h3>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter">
                  {plan.price !== "Custom" ? "TZS" : ""} {plan.price}
                </span>
                {plan.price !== "Custom" && (
                   <span className={cn("text-[10px] font-bold uppercase tracking-widest opacity-60")}>/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                )}
              </div>
              <p className={cn("mt-8 text-sm font-medium leading-relaxed h-12 overflow-hidden", plan.highlight ? "text-indigo-100" : "text-slate-400")}>{plan.desc}</p>
              
              <ul className="mt-12 space-y-6 flex-grow">
                {plan.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className={cn("h-4 w-4 shrink-0", plan.highlight ? "text-white" : "text-indigo-400")} />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/255716040796?text=${encodeURIComponent(`Hello MtaalamuTech, I want to purchase the ${plan.name} plan for ${selectedServicePrice.replace("-", " ")} (${billingCycle} billing) for ${plan.price !== "Custom" ? "TZS " + plan.price : "Custom Price"}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-14 rounded-2xl py-6 text-center text-xs font-black uppercase tracking-[0.3em] transition-all active:scale-95",
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-slate-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                )}
              >
                BUY NOW
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
