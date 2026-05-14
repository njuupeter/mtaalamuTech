import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface Visual3DProps {
  color: string;
  className?: string;
  type?: "abstract" | "graph" | "code" | "design" | "screen" | "trading" | "investment" | "computing" | "logic" | "media" | "candlestick";
}

export default function Visual3D({ color, className, type = "abstract" }: Visual3DProps) {
  const renderShape = () => {
    switch (type) {
      case "investment":
        return (
          <div className="relative h-48 w-72 flex flex-col p-4 glass-card border-white/5 rounded-2xl overflow-hidden group bg-black/20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1.5 font-mono text-[8px] font-black text-indigo-400">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                MARKET DATA
              </div>
              <div className="flex gap-2">
                {["$", "€", "¥"].map((s, i) => (
                  <motion.span
                    key={s}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    className="text-[10px] font-black text-white/40"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="relative flex-grow">
              {/* Background Grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 opacity-10">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="border-t border-l border-white/20" />
                ))}
              </div>

              {/* Fluctuating Line Graphs */}
              <svg className="absolute inset-0 w-full h-full" overflow="visible">
                <motion.path
                  d="M0,60 C40,40 80,100 120,50 C160,0 200,80 240,40"
                  stroke="rgba(99, 102, 241, 0.6)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,80 C50,90 100,50 150,70 C200,90 250,50 280,60"
                  stroke="rgba(16, 185, 129, 0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Data Points */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={60 + i * 80}
                    cy={Math.random() * 80 + 20}
                    r="2"
                    fill="white"
                    animate={{ r: [2, 4, 2], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </svg>

              {/* Price Indicators */}
              <div className="absolute top-0 right-0 space-y-2">
                <div className="flex flex-col items-end">
                   <span className="text-[6px] font-mono text-slate-500 uppercase tracking-tighter">Live_Yield</span>
                   <motion.span 
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-[12px] font-black font-mono text-emerald-400"
                   >
                    +1.24%
                   </motion.span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-end">
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["10%", "90%", "10%"] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-full bg-indigo-500/50" 
                  />
                </div>
                <span className="text-[5px] font-mono text-slate-600 uppercase">Portfolio_Exposure_Index</span>
              </div>
              <div className="h-6 w-12 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>

            <motion.div 
               animate={{ x: [-100, 400] }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" 
            />
          </div>
        );
      case "computing":
        return (
          <div className="relative h-48 w-72 flex items-center justify-center group">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    borderColor: ["rgba(255,255,255,0.05)", "rgba(99,102,241,0.5)", "rgba(255,255,255,0.05)"],
                    backgroundColor: ["transparent", "rgba(99,102,241,0.05)", "transparent"]
                  }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                  className="h-14 w-14 rounded-lg border border-white/5 flex flex-col p-1.5 gap-1"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    <div className="h-[2px] w-2 bg-indigo-500/20" />
                  </div>
                  <div className="space-y-1 mt-auto">
                    <div className="h-1 w-full bg-white/5 rounded-full" />
                    <div className="h-1 w-3/4 bg-white/5 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
            <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
              <motion.path
                d="M100 80 L200 120 M100 120 L200 80 M150 50 L150 150"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </svg>
          </div>
        );
      case "logic":
        return (
          <div className="relative h-48 w-64 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotateY: [i * 90, i * 90 + 360],
                    rotateX: [i * 45, i * 45 + 180]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={cn(
                    "absolute inset-0 m-auto border border-indigo-500/20 rounded-3xl",
                    i === 0 ? "h-32 w-32" : i === 1 ? "h-24 w-24" : i === 2 ? "h-16 w-16" : "h-8 w-8"
                  )}
                />
              ))}
              <div className="absolute inset-0 m-auto h-1 w-1 bg-white rounded-full shadow-[0_0_20px_#fff]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-10">
                  <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          </div>
        );
      case "media":
        return (
          <div className="relative h-48 w-64 flex items-center justify-center">
            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [i * 30, i * 30 + 360]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  className={cn(
                    "absolute h-32 w-32 rounded-full border border-orange-500/10",
                    "bg-gradient-to-tr from-orange-500/5 to-transparent blur-[1px]"
                  )}
                  style={{ transformOrigin: "center center" }}
                />
              ))}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 glass-card border-white/10 rounded-2xl rotate-45 flex items-center justify-center"
              >
                <div className="h-6 w-6 border-2 border-orange-500/50 rounded-sm" />
              </motion.div>
            </div>
          </div>
        );
      case "candlestick":
        return (
          <div className="relative h-64 w-64 flex items-center justify-center perspective-1000">
             <div className="relative w-full h-full preserve-3d">
                {[...Array(5)].map((_, i) => (
                   <motion.div
                    key={i}
                    initial={{ 
                      x: (i - 2) * 40,
                      y: Math.random() * 50 - 25,
                      z: Math.random() * 100 - 50,
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{ 
                      y: [null, Math.random() * 60 - 30, Math.random() * 60 - 30],
                      opacity: [0, 1, 0.8],
                      scale: [0.5, 1, 0.9],
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className="absolute inset-0 m-auto w-2 h-32 flex flex-col items-center justify-center"
                   >
                      {/* Wick */}
                      <div className="w-[1.5px] h-full bg-white/40 absolute" />
                      {/* Body */}
                      <motion.div 
                        animate={{ 
                          height: i % 2 === 0 ? [40, 60, 40] : [60, 30, 60],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className={cn(
                          "w-4 rounded-sm shadow-2xl relative z-10",
                          i % 2 === 0 ? "bg-red-500" : "bg-emerald-500"
                        )}
                        style={{ 
                          boxShadow: i % 2 === 0 
                            ? "0 0 30px rgba(239, 68, 68, 0.8), 0 0 10px rgba(239, 68, 68, 0.4)" 
                            : "0 0 30px rgba(16, 185, 129, 0.8), 0 0 10px rgba(16, 185, 129, 0.4)" 
                        }}
                      />
                   </motion.div>
                ))}
             </div>
          </div>
        );
      case "trading":
        return (
          <div className="relative group drop-shadow-2xl cursor-pointer w-full h-full flex items-center justify-center p-4">
              <div 
                className="relative resize-x overflow-hidden min-w-[280px] w-full max-w-[550px] aspect-video group/resize"
                onClick={() => window.open('https://www.tradingview.com/chart/v0U71juL/', '_blank')}
              >
                  {/* MacBook-style Body */}
                  <div className="relative h-full w-full bg-[#A1A1A1] rounded-t-xl border border-white/20 p-1 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-[1.01]">
                    <div className="h-full w-full bg-[#131722] rounded-lg relative overflow-hidden">
                       {/* TradingView Live Chart */}
                       <iframe 
                        src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=5&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=0&saveimage=0&toolbarbg=131722&theme=dark&style=1&timezone=Etc/UTC"
                        className="absolute inset-0 w-full h-full border-none pointer-events-none"
                        title="TradingView Chart"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#131722]/80 via-transparent to-transparent pointer-events-none" />
                       
                       {/* Interaction Hint */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <div className="px-5 py-2.5 bg-indigo-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white shadow-2xl flex items-center gap-2">
                             View Live Market
                          </div>
                       </div>
    
                       {/* Interface Overlays */}
                       <div className="absolute top-2 left-2 flex gap-1 opacity-50">
                          <div className="h-1 w-1 rounded-full bg-red-500" />
                          <div className="h-1 w-1 rounded-full bg-yellow-400" />
                          <div className="h-1 w-1 rounded-full bg-green-500" />
                       </div>
                       
                       <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-[2px] bg-indigo-500/80 text-[5px] font-black text-white">BTC/USD LIVE</div>
                    </div>
                  </div>
                  {/* Bottom Case */}
                  <div className="h-2 w-full bg-[#8E8E8E] rounded-b-xl border-t border-black/10 shadow-lg relative">
                    <div className="absolute right-1 bottom-1 w-1.5 h-1.5 border-r border-b border-black/30 pointer-events-none" />
                  </div>
                  <div className="mx-auto h-0.5 w-24 bg-[#707070] rounded-b-md opacity-50" />
              </div>
          </div>
        );
      case "graph":
        return (
          <div className="flex items-center gap-2 h-40 w-64 justify-center">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => {
              const isGreen = i % 2 === 0;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-px h-24 bg-white/10 relative">
                    <motion.div
                      animate={{ 
                        height: isGreen ? [15, 30, 15] : [30, 15, 30],
                        y: isGreen ? [0, -5, 0] : [0, 5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 w-4 rounded-sm shadow-[0_0_20px]",
                        isGreen ? "bg-emerald-500 shadow-emerald-500/40" : "bg-rose-500 shadow-rose-500/40"
                      )}
                      style={{ top: "30%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      case "code":
        return (
          <div className="relative h-44 w-72 group drop-shadow-2xl">
              {/* MacBook-style Body */}
              <div className="relative h-40 w-full bg-[#A1A1A1] rounded-t-xl border border-white/20 p-1 flex items-center justify-center overflow-hidden">
                <div className="h-full w-full bg-black rounded-lg p-3 font-mono text-[7px] leading-tight overflow-hidden">
                   <div className="flex gap-1 mb-1.5 opacity-50">
                      <div className="h-1 w-1 rounded-full bg-red-500" />
                      <div className="h-1 w-1 rounded-full bg-yellow-400" />
                      <div className="h-1 w-1 rounded-full bg-green-500" />
                   </div>
                   <motion.div
                     animate={{ y: [0, -400] }}
                     transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                     className="space-y-1"
                   >
                     {[...Array(40)].map((_, i) => (
                       <div key={i} className="flex gap-1.5">
                         <span className="text-slate-600 block w-3 shrink-0">{i + 1}</span>
                         <span className={cn(
                           i % 5 === 0 ? "text-indigo-400" : i % 5 === 2 ? "text-emerald-400" : i % 5 === 4 ? "text-amber-400" : "text-slate-300"
                         )}>
                           {i % 6 === 0 ? "export default function " : i % 6 === 1 ? "const [data, setData] = " : i % 6 === 2 ? "axios.get(" : "return <Component "} 
                           {i % 4 === 0 ? "() {" : "data"} ...
                         </span>
                       </div>
                     ))}
                   </motion.div>
                </div>
              </div>
              {/* Bottom Case */}
              <div className="h-1.5 w-full bg-[#8E8E8E] rounded-b-xl border-t border-black/10 shadow-lg" />
              <div className="mx-auto h-0.5 w-16 bg-[#707070] rounded-b-md opacity-50" />
          </div>
        );
      case "design":
        return (
          <div className="relative h-32 w-32 flex items-center justify-center">
             {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  rotate: [i * 60, i * 60 + 360],
                  scale: [1, 1.2, 1],
                  borderRadius: ["20%", "50%", "20%"]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                className={cn(
                  "absolute h-12 w-12 border border-white/20 backdrop-blur-sm",
                  `bg-${color}-500/10`
                )}
                style={{ transform: `rotate(${i * 60}deg) translateX(40px)` }}
              />
            ))}
          </div>
        );
      case "screen":
        return (
          <div className="relative w-64 h-40 group">
             {/* Frame */}
             <div className="relative h-full w-full rounded-md bg-black p-1.5 border-[6px] border-slate-900 shadow-2xl overflow-hidden">
                {/* LED Grid Panel */}
                <div className="absolute inset-0 grid grid-cols-16 grid-rows-10 gap-[0.5px] p-0.5 box-content">
                  {[...Array(160)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        backgroundColor: i % 4 === 0 ? ["#4f46e5", "#10b981", "#4f46e5"] : i % 4 === 1 ? ["#10b981", "#4f46e5", "#10b981"] : i % 4 === 2 ? ["#4f46e5", "#ffffff", "#4f46e5"] : ["#000000", "#1e293b", "#000000"],
                        opacity: [0.3, 0.9, 0.3],
                        scale: [1, 0.95, 1]
                      }}
                      transition={{ 
                        duration: 3 + (i % 3), 
                        repeat: Infinity, 
                        delay: (i % 16) * 0.05
                      }}
                      className="aspect-square w-full rounded-[0.25px]"
                    />
                  ))}
                </div>
                {/* Scan Line */}
                <motion.div 
                  animate={{ y: [0, 160, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-0.5 bg-cyan-400/30 shadow-[0_0_15px_#22d3ee] z-10"
                />
                {/* Brand Badge */}
                <div className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded-[2px] bg-black/80 backdrop-blur-sm border border-white/10 text-[5px] font-black tracking-tighter text-white z-20">
                  NOVASTAR INTEGRATED
                </div>
             </div>
             {/* Mounting Brackets */}
             <div className="absolute -left-1 top-4 h-8 w-1 bg-slate-800 rounded-l-sm" />
             <div className="absolute -right-1 top-4 h-8 w-1 bg-slate-800 rounded-r-sm" />
          </div>
        );
      default:
        return (
          <motion.div
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 180, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative h-32 w-32 preserve-3d"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "absolute inset-0 border-2 rounded-xl opacity-60 backdrop-blur-sm",
                  `border-${color}-500/50`,
                  `bg-${color}-500/10`
                )}
                style={{
                  transform: `translateZ(${i * 20}px) rotate(${i * 45}deg)`,
                }}
              />
            ))}
            <div className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full blur-xl",
              `bg-${color}-400`
            )} />
          </motion.div>
        );
    }
  };

  return (
    <div className={cn("relative h-full w-full overflow-visible flex items-center justify-center", className)}>
      {renderShape()}
      
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 200 - 100, 
              y: Math.random() * 200 - 100,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -120],
              x: [null, Math.random() * 40 - 20],
              opacity: [0, 0.5, 0] 
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className={cn("h-1 w-1 rounded-full", `bg-${color}-400 shadow-[0_0_8px_rgba(var(--color-${color}-400),0.5)]`)}
          />
        ))}
      </div>
    </div>
  );
}
