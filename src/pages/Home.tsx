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
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const services = [
  {
    title: "Investment Services",
    description: "Personalized capital management and strategic investment advisory for wealth growth.",
    icon: BarChart3,
    color: "bg-blue-500",
  },
  {
    title: "FX Trading & Education",
    description: "Learn professional Forex trading with our expert-led courses and live market insights.",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    title: "Web Development",
    description: "Modern, high-performance web applications tailored to your business needs.",
    icon: Globe,
    color: "bg-indigo-500",
  },
  {
    title: "Graphic Design",
    description: "Crafting unique brand identities and stunning visual content for your brand.",
    icon: Layout,
    color: "bg-orange-500",
  },
  {
    title: "Programming",
    description: "Custom software development focusing on efficiency, scalability, and code quality.",
    icon: Code,
    color: "bg-violet-500",
  },
  {
    title: "LED Screen Operation",
    description: "Professional management of digital signage and large-scale LED screen installations.",
    icon: Monitor,
    color: "bg-rose-500",
  },
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

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-24 lg:pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-sm font-semibold text-indigo-700"
            >
              <Rocket className="h-4 w-4" />
              Empowering Tanzania through Technology
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl"
            >
              The Modern Partner for <span className="text-indigo-600">Investment</span> & IT Excellence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
            >
              MtaalamuTech provides world-class digital solutions and investment insights. 
              From high-end software development to professional Forex education, we are your 
              trusted partner in growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/services"
                className="rounded-full bg-slate-900 px-8 py-4 text-center font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl sm:px-10"
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-slate-200 bg-white px-8 py-4 text-center font-bold text-slate-900 transition-all hover:bg-slate-50 sm:px-10"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-12"
            >
              <div>
                <p className="text-3xl font-bold text-slate-900">150+</p>
                <p className="text-sm text-slate-500">Clients Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">45+</p>
                <p className="text-sm text-slate-500">Expert Staff</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-600">99.9%</p>
                <p className="text-sm text-slate-500">Service Uptime</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract shapes for premium feel */}
        <div className="absolute right-0 top-0 -z-10 h-full w-1/3 opacity-20 blur-3xl">
          <div className="h-full w-full bg-linear-to-b from-indigo-500 to-violet-500 rounded-bl-full" />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-100 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-base font-bold uppercase tracking-widest text-indigo-600">Our Services</h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Solutions tailored for you</p>
            <div className="mt-6 h-1 w-20 rounded-full bg-indigo-600" />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className={cn("inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-indigo-500/20 mb-6", service.color)}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{service.description}</p>
                <div className="mt-auto pt-8">
                  <Link
                    to="/booking"
                    className="flex items-center gap-2 text-sm font-bold text-indigo-600 transition-all group-hover:gap-3"
                  >
                    Request Service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 flex items-center gap-4 rounded-3xl bg-white p-6 shadow-xl lg:p-8">
                <ShieldCheck className="h-12 w-12 text-indigo-600" />
                <div>
                  <p className="text-xl font-bold text-slate-900">Certified Experts</p>
                  <p className="text-sm text-slate-500">100% Secure & Trusted</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Why MtaalamuTech stands out</h2>
              <p className="mt-6 text-lg text-slate-600">
                We combine deep technical expertise with strategic financial insight. 
                Our team is committed to delivering quality that converts vision into reality.
              </p>
              
              <ul className="mt-10 space-y-6">
                {[
                  "Result-oriented approach to projects",
                  "Expert financial consultants with 10+ years experience",
                  "High-end security standards for all digital products",
                  "Dedicated 24/7 client support system",
                  "Competitive and transparent pricing"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="rounded-full bg-indigo-100 p-1">
                      <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="font-medium text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/about"
                className="mt-12 inline-flex items-center gap-2 rounded-full border-2 border-slate-900 px-8 py-3.5 font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
              >
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-600 py-24 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-base font-bold uppercase tracking-widest text-indigo-200">Testimonials</h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Trusted by innovators</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col rounded-3xl bg-indigo-700/50 p-8 backdrop-blur-sm">
                <div className="mb-6 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="flex-grow text-lg italic text-indigo-50 leading-relaxed">"{t.text}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-indigo-200">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] bg-slate-900 p-8 text-center text-white shadow-2xl shadow-indigo-600/20 lg:p-24">
          <h2 className="text-4xl font-extrabold sm:text-6xl">Ready to tech-up your business?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Join hundreds of satisfied clients in Tanzania. Book a consultation or 
            request a custom quote today and let's build something extraordinary.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link 
              to="/booking"
              className="rounded-full bg-white px-10 py-4 font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105"
            >
              Book Now
            </Link>
            <Link 
              to="/contact"
              className="rounded-full border border-slate-700 px-10 py-4 font-bold text-white transition-all hover:bg-slate-800"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Rocket(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}
