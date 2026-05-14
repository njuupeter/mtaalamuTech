import { motion } from "motion/react";
import { Shield, Target, Eye, Gem, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Story Section */}
      <section className="relative bg-slate-900 py-24 sm:py-32 text-white overflow-hidden">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black tracking-tight sm:text-7xl uppercase leading-none"
          >
            Crafting Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-serif italic lowercase">Legacies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base text-slate-400 leading-relaxed sm:text-xl font-medium"
          >
            MtaalamuTech was founded with a single mission: to bridge the gap between 
            vision and technical reality. Based in Dar es Salaam, we provide the 
            intellectual capital and technical infrastructure required for the modern 
            enterprise to thrive in an increasingly digital world.
          </motion.p>
        </div>
        
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-indigo-600/20 blur-[120px] rounded-full" />
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {[
            {
              title: "Our Mission",
              desc: "To deliver elite technological and financial solutions that empower businesses and individuals to reach their full potential.",
              icon: Target,
              color: "indigo"
            },
            {
              title: "Our Vision",
              desc: "To be the leading innovator in Africa's digital economy, setting the gold standard for quality and trust.",
              icon: Eye,
              color: "emerald"
            },
            {
              title: "Our Promise",
              desc: "Integrity, excellence, and transparency in every line of code and every investment insight we provide.",
              icon: Shield,
              color: "violet"
            }
          ].map((box, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/[0.08] hover:-translate-y-2 shadow-2xl"
            >
              <div className={cn("inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl text-white shadow-lg mb-6 sm:mb-8", `bg-${box.color}-600`)}>
                <box.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{box.title}</h3>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-400 leading-relaxed">
                {box.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-24 flex flex-col items-center text-center px-4">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl uppercase tracking-[0.2em] leading-none">Core Values</h2>
            <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
          </div>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
            {[
              { title: "Innovation", icon: Gem, text: "Constantly pushing the boundaries of what is possible." },
              { title: "Excellence", icon: Gem, text: "Relentless pursuit of quality in every detail." },
              { title: "Trust", icon: Users, text: "Building long-term partnerships based on transparency." },
              { title: "Expertise", icon: Award, text: "Deep knowledge across every domain we serve." },
            ].map((v, i) => (
              <div key={i} className="text-center group bg-white/5 p-8 rounded-[2rem] border border-white/5 sm:bg-transparent sm:p-0 sm:border-0 hover:bg-white/10 transition-all">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-indigo-400 border border-white/5 transition-transform group-hover:scale-110 shadow-xl">
                  <v.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">{v.title}</h4>
                <p className="mt-3 sm:mt-4 text-[10px] sm:text-sm text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-24">
         <div className="rounded-[2.5rem] sm:rounded-[4rem] bg-indigo-600 p-8 sm:p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
            <div className="max-w-xl text-center lg:text-left relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase">Led by Industry <br /> Leaders</h2>
              <p className="mt-6 text-indigo-100 text-base sm:text-lg leading-relaxed font-medium">
                Our leadership team brings together decades of experience from international finance 
                and global tech hubs. We don't just follow trends; we set them.
              </p>
              <button className="mt-8 rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-indigo-600 transition-all hover:scale-105 shadow-xl">
                Join our Team
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10 shrink-0">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl sm:rounded-3xl bg-indigo-500 overflow-hidden border-4 border-indigo-400/50 shadow-2xl">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      alt="Team member" 
                      className="h-full w-full object-cover filter grayscale"
                    />
                 </div>
               ))}
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

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
