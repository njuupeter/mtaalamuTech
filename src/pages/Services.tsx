import { motion } from "motion/react";
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
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const services = [
  {
    id: "investment",
    title: "Investment Services",
    description: "Expert advisory for stock market, real estate, and diversified portfolios tracking global trends.",
    icon: BarChart3,
    color: "indigo",
    features: ["Capital Management", "Portfolio Analysis", "Risk Assessment"]
  },
  {
    id: "forex",
    title: "FX Trading & Education",
    description: "Learn to trade currencies with professional risk management strategies used by institutions.",
    icon: TrendingUp,
    color: "emerald",
    features: ["Live Market Analysis", "Beginner to Pro Courses", "One-on-One Mentorship"]
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Full-stack web solutions from landing pages to complex e-commerce and SaaS platforms.",
    icon: Globe,
    color: "blue",
    features: ["Responsive Design", "SEO Optimization", "Ongoing Maintenance"]
  },
  {
    id: "programming",
    title: "Custom Programming",
    description: "Building robust desktop and mobile applications that solve real-world business problems.",
    icon: Cpu,
    color: "violet",
    features: ["Python, Java, Node.js", "Database Integration", "Legacy System Migration"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Visual communication that captures attention and builds trust with your audience.",
    icon: Layout,
    color: "orange",
    features: ["Logo & Branding", "Social Media Kits", "Print Media Design"]
  },
  {
    id: "teaching",
    title: "Technical Training",
    description: "Workshops and courses for schools and companies to upgrade their technical literacy.",
    icon: BookOpen,
    color: "rose",
    features: ["IT Staff Training", "School Tech Programs", "Modern Software Workshops"]
  },
  {
    id: "led-ops",
    title: "LED Screen Operation",
    description: "Technical support and content management for large format digital displays and billboards.",
    icon: Monitor,
    color: "cyan",
    features: ["Content Scheduling", "Remote Maintenance", "Event Integration"]
  }
];

export default function Services() {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Our Full Expertise</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              MtaalamuTech offers a comprehensive suite of digital and financial services 
              designed to propel your growth in the modern economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-[2.5rem] bg-white p-2 shadow-xl shadow-slate-200/60 lg:flex-row lg:items-stretch"
            >
              {/* Visual Side */}
              <div className={cn(
                "relative flex h-48 w-full flex-col justify-center rounded-[2rem] p-8 text-white lg:h-auto lg:w-48 lg:flex-shrink-0",
                `bg-${service.color}-600`
              )}>
                <service.icon className="h-12 w-12" />
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Content Side */}
              <div className="flex flex-grow flex-col p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                  <div className={cn("hidden h-2 w-2 rounded-full lg:block", `bg-${service.color}-600`)} />
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <CheckCircle2 className={cn("h-4 w-4", `text-${service.color}-600`)} />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400">#MT-{service.id.toUpperCase()}</span>
                  <Link 
                    to={`/booking?service=${service.id}`}
                    className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:gap-2 transition-all"
                  >
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Table Section */}
      <section className="container mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Transparent Pricing</h2>
          <p className="mt-4 text-slate-500">Pick a package that fits your ambition</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Standard",
              price: "49k",
              desc: "Perfect for individuals and small startups.",
              items: ["Single Project", "Basic Support", "3 Revisions"],
              highlight: false
            },
            {
              name: "Premium",
              price: "199k",
              desc: "Optimized for growing businesses and serious traders.",
              items: ["Priority Queue", "24/7 Support", "Unlimited Revisions", "Strategic Advisory"],
              highlight: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              desc: "Dedicated solutions for large organizations.",
              items: ["Dedicated Manager", "On-site Integration", "Compliance Audit", "Lifetime Support"],
              highlight: false
            }
          ].map((plan, i) => (
            <div key={i} className={cn(
              "flex flex-col rounded-3xl p-10 transition-all",
              plan.highlight 
                ? "bg-slate-900 text-white shadow-2xl shadow-indigo-500/20 scale-105" 
                : "bg-white border border-slate-100"
            )}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={cn("text-sm", plan.highlight ? "text-slate-400" : "text-slate-500")}>/project</span>
              </div>
              <p className={cn("mt-6 text-sm", plan.highlight ? "text-slate-300" : "text-slate-500")}>{plan.desc}</p>
              
              <ul className="mt-8 space-y-4 flex-grow">
                {plan.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                className={cn(
                  "mt-10 rounded-xl py-4 text-center font-bold transition-all",
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                )}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
