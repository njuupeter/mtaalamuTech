import { motion } from "motion/react";
import { 
  BarChart3, 
  Code, 
  Layout, 
  TrendingUp, 
  Globe, 
  Laptop, 
  Monitor, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Sparkles,
  Quote,
  HelpCircle,
  Plus,
  Minus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "../lib/utils";
import Visual3D from "../components/Visual3D";
import { AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";
import { PRICING_DETAILS } from "../constants";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedServicePrice, setSelectedServicePrice] = useState("forex");
  const { t } = useLanguage();

  const currentPrices = PRICING_DETAILS[selectedServicePrice as keyof typeof PRICING_DETAILS] || PRICING_DETAILS["forex"];

  const services = [
    {
      title: t("card_fx_title"),
      description: t("card_fx_desc"),
      icon: TrendingUp,
      color: "emerald",
      href: "/services#forex",
      visualType: "trading" as const
    },
    {
      title: t("card_intel_title"),
      description: t("card_intel_desc"),
      icon: BarChart3,
      color: "indigo",
      href: "/services#investment",
      visualType: "investment" as const
    },
    {
      title: t("card_web_title"),
      description: t("card_web_desc"),
      icon: Globe,
      color: "blue",
      href: "/services#web-dev",
      visualType: "computing" as const
    },
    {
      title: t("card_media_title"),
      description: t("card_media_desc"),
      icon: Layout,
      color: "orange",
      href: "/services#graphic-design",
      visualType: "media" as const
    },
    {
      title: t("card_logic_title"),
      description: t("card_logic_desc"),
      icon: Code,
      color: "violet",
      href: "/services#programming",
      visualType: "logic" as const
    },
    {
      title: t("card_led_title"),
      description: t("card_led_desc"),
      icon: Monitor,
      color: "cyan",
      href: "/services#led-ops",
      visualType: "screen" as const
    },
  ];

  const faqs = [
    {
      question: "What specific industries does MtaalamuTech serve?",
      answer: "We specialize in Finance (Forex & Investments), Engineering (Web, Software, & LED Systems), Creative Media, and Technical Education. Our solutions are designed for high-performance enterprise environments."
    },
    {
      question: "Do you offer physical hardware for LED screen operations?",
      answer: "We focus on the technical integration and operation using NovaStar control systems. While we can recommend hardware partners, our core value is the sophisticated management and calibration of your display ecosystem."
    },
    {
      question: "What makes your Forex education different?",
      answer: "Our curriculum is based on High-Fidelity charting and Institutional Order Flow, inspired by TradingView's precision. We teach you to identify smart money concepts rather than relying on lagging indicators."
    },
    {
      question: "Are your web solutions compliant with international standards?",
      answer: "Yes, we strictly follow W3C protocols to ensure all engineering projects are scalable, secure, and globally accessible across all digital touchpoints."
    },
    {
      question: "How do I start a project with MtaalamuTech?",
      answer: "Simply visit our services page to choose your module, and use our secure booking system or contact us directly for a technical briefing."
    }
  ];

  const testimonials = [
    {
      name: "John Musiba",
      role: "Equity Investor",
      text: "MtaalamuTech has transformed my understanding of investment. Their advisory is top-notch and results-driven.",
      rating: 5,
    },
    {
      name: "Sarah Kimaro",
      role: "E-commerce Owner",
      text: "The web development team delivered a platform that exceeded my expectations. Professional and timely.",
      rating: 5,
    },
    {
      name: "David Msuya",
      role: "FX Trader",
      text: "Taught me how to trade without the noise. Their Forex education program is the best in Tanzania.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-full w-full object-cover opacity-30 grayscale saturate-50"
          >
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=7b5e6834a3628e9323bb444983086395b2d7f87d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/60 via-transparent to-[#05060f]" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-indigo-400"
            >
              <Sparkles className="h-4 w-4 fill-indigo-400" />
              {t("hero_badge")}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-10 max-w-5xl text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-[10rem] leading-[0.8] uppercase"
            >
              {t("hero_title_1") && <>{t("hero_title_1")} <br /></>}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-indigo-500">
                {t("hero_title_2")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 max-w-2xl text-lg text-slate-300 sm:text-2xl font-medium leading-relaxed tracking-tight"
            >
              {t("hero_desc")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
            >
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-10 py-5 font-black text-slate-900 transition-all hover:scale-105"
              >
                Launch Experience <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Background 3D element */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[5%] top-[20%] opacity-40 scale-150 transform-gpu"
          >
            <Visual3D color="indigo" type="candlestick" />
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[10%] top-[40%] opacity-35 scale-[2] transform-gpu"
          >
            <Visual3D color="emerald" type="candlestick" />
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-[15%] bottom-[10%] opacity-30 scale-[1.5] transform-gpu"
          >
            <Visual3D color="red" type="candlestick" />
          </motion.div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 w-full max-w-4xl aspect-square opacity-20">
            <Visual3D color="indigo" className="scale-[2.5]" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500">Core Modules</h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">Architected for Performance</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-[2.5rem] p-10 glass-card glass-hover border-white/5"
              >
                <div className="relative h-48 w-full mb-8 rounded-3xl overflow-hidden glass-card border-white/5 flex items-center justify-center p-4">
                   <Visual3D color={service.color} type={service.visualType} className="scale-75 group-hover:scale-90 transition-transform duration-500" />
                   <div className={cn("absolute top-3 left-3 h-8 w-8 items-center justify-center rounded-lg text-white shadow-2xl transition-transform group-hover:scale-110", `bg-${service.color}-600`)}>
                     <service.icon className="h-4 w-4 m-auto mt-2" />
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{service.title}</h3>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed font-normal">{service.description}</p>
                <div className="mt-10 pt-8 border-t border-white/5">
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 transition-all hover:gap-4"
                  >
                    {t("ui_view_specs")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-[3rem] p-4 glass-card border-white/5 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-transparent">
                <Visual3D color="indigo" type="trading" className="scale-125 transform-gpu" />
              </div>
            </div>

            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400 mb-6">{t("ui_why_badge")}</h2>
              <h3 className="text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase leading-[0.9]">{t("ui_why_title")}</h3>
              <p className="mt-8 text-lg text-slate-400 leading-relaxed font-normal">
                We bridge the gap between complex engineering and strategic financial growth. Our methodologies 
                are built on transparency, precision, and institutional-grade standards.
              </p>
              
              <ul className="mt-12 space-y-6">
                {[
                  "Algorithmic precision in every deployment",
                  "Elite financial advisory from Master Traders",
                  "End-to-end encrypted technical standards"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="rounded-full bg-white/5 p-1 border border-white/10 transition-colors group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 group-hover:text-indigo-400" />
                    </div>
                    <span className="font-bold text-slate-300 text-sm tracking-wide uppercase">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 overflow-hidden border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-24 text-center">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 mb-6">{t("ui_client_stories")}</h2>
            <p className="max-w-4xl mx-auto text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1]">
              Trusted by <span className="text-slate-500 italic font-serif lowercase">global</span> leaders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col rounded-[3rem] p-12 glass-card glass-hover relative overflow-hidden"
              >
                <Quote className="absolute -top-4 -right-4 h-24 w-24 text-white/[0.03] rotate-12" />
                <div className="mb-10 flex gap-1.5 relative z-10">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star 
                      key={starIdx} 
                      className={cn(
                        "h-4 w-4 transition-all duration-500",
                        starIdx < t.rating 
                          ? "fill-indigo-400 text-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.4)]" 
                          : "text-slate-700"
                      )} 
                    />
                  ))}
                </div>
                <blockquote className="flex-grow text-xl font-medium text-white leading-relaxed tracking-tight">
                  "{t.text}"
                </blockquote>
                <div className="mt-12 flex items-center gap-6 pt-10 border-t border-white/5">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-2xl shadow-inner">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-tight">{t.name}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Advantage Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square glass-card rounded-[4rem] border-white/5 relative overflow-hidden flex items-center justify-center p-12">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                 <Visual3D color="indigo" type="candlestick" className="scale-150" />
                 
                 {/* Floating Labels */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute top-1/4 right-1/4 px-4 py-2 glass-card rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400"
                 >
                   Liquidity_Node
                 </motion.div>
                 
                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                   className="absolute bottom-1/4 left-1/4 px-4 py-2 glass-card rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-400"
                 >
                   Volume_Delta: +24%
                 </motion.div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 mb-8">Proprietary Tech</h2>
              <p className="text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[0.9] uppercase mb-10">
                The Edge You <br /> <span className="text-slate-500">Need to Win.</span>
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-lg">
                MtaalamuTech leverages high-fidelity data visualization and institutional-grade analytics to provide traders with a distinct market advantage.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { label: "Execution Speed", value: "0.4ms" },
                  { label: "Data Fidelity", value: "99.9%" },
                  { label: "API Uptime", value: "100%" },
                  { label: "Risk Radius", value: "Limited" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 scroll-mt-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">{t("ui_faq_badge")}</h2>
            <p className="text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase leading-[0.9]">
              {t("ui_faq_title")}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-3xl glass-card overflow-hidden border-white/5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left transition-all hover:bg-white/5"
                >
                  <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                  <div className={cn(
                    "flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300",
                    openFaq === i ? "bg-indigo-600 rotate-90" : "bg-white/5"
                  )}>
                    {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(PRICING_DETAILS).map((serviceId) => (
                <button
                  key={serviceId}
                  onClick={() => setSelectedServicePrice(serviceId)}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter transition-all border",
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

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[4rem] bg-indigo-600 p-10 text-center text-white shadow-2xl shadow-indigo-600/30 lg:p-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-black sm:text-7xl uppercase tracking-tighter">{t("ui_cta_title")}</h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-indigo-100 font-medium">
              {t("ui_cta_desc")}
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-6">
              <Link 
                to="/booking"
                className="rounded-full bg-white px-12 py-5 font-black uppercase text-xs tracking-widest text-indigo-600 transition-all hover:scale-105 active:scale-95"
              >
                {t("ui_cta_btn")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
